import React, { PropTypes } from 'react';
import OverlayTrigger from 'react-bootstrap/lib/overlayTrigger';
import Popover from 'react-bootstrap/lib/popover';
import ColorPicker from './colorPicker.jsx';
import { replaceCards, moveCardToColumn } from './core/actions';
import { DragSource } from 'react-dnd';
import { dragItemTypes } from './core/dragItemTypes';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
    return {
        replaceCards: (source, target) => dispatch(replaceCards(source, target)),
        moveCardToColumn: (source, target) => dispatch(moveCardToColumn(source, target))
    }
};

const cardSource = {
    beginDrag(props) {
        return {
            columnIdx: props.idx,
            parentIdx: props.parent
        }
    },
    endDrag(props, monitor, component) {
        const dropResult = monitor.getDropResult();
        if(!dropResult) return;
        const source = { parentIdx: props.parent, cardIdx: props.idx };
        const target = { parentIdx: dropResult.parent, cardIdx: dropResult.idx };
        if(props.parent == dropResult.parent && dropResult.idx) {
            component.dispatchProps.replaceCards(source, target);
        }
        else {
            component.dispatchProps.moveCardToColumn(source, target);
        }
    }
};

const collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
};

class Card extends React.Component {

    constructor(props) {
        super(props);

        this.popover = (
            <Popover id={'pop'+this.props.idx} title="Change color">
                <ColorPicker onColorChange={this.changeColor.bind(this)} />
            </Popover>
        )
    }

    changeColor(e) {
        const color = e.target.dataset.color;
        this.props.changeCardColor(color)
    }

    render() {
        const { idx, text, removeCard, color, connectDragSource, isDragging } = this.props;
        const style = {
            backgroundColor: color,
            opacity: isDragging ? 0.5 : 1
        };
        return connectDragSource(
            <div className="card-component">
                <div style={style} data-idx={idx} className="well well-sm">
                    <span>{text}</span>
                    <div className="actions pull-right">
                        <OverlayTrigger rootClose trigger="click" placement="bottom" overlay={this.popover}>
                            <i className="glyphicon glyphicon-tint"></i>
                        </OverlayTrigger>
                        <i onClick={removeCard} className="glyphicon glyphicon-remove"></i>
                    </div>
                </div>
            </div>
        )
    }

}

Card.propTypes = {
    text: PropTypes.string.isRequired,
    idx: PropTypes.number.isRequired,
    removeCard: PropTypes.func.isRequired,
    color: PropTypes.string,
    changeCardColor: PropTypes.func
};

export default DragSource(dragItemTypes.CARD, cardSource, collect)(connect(null, mapDispatchToProps)(Card));