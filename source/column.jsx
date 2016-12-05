import React, { PropTypes } from 'react';
import Card from './card.jsx';
import Modal from 'react-bootstrap/lib/modal';
import { addCard, removeCard, changeCardColor, replaceColumns } from './core/actions';
import { dragItemTypes } from './core/dragItemTypes';
import BoardCard from './boardCard.jsx';
import BoardColumnPanelBody from './boardColumnPanelBody.jsx';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
    return {
        addCard: data => dispatch(addCard(data)),
        removeCard: data => dispatch(removeCard(data)),
        changeCardColor: ({columnIdx, cardIdx}, color) => dispatch(changeCardColor({columnIdx, cardIdx, color})),
        replaceColumns: (source, target) => dispatch(replaceColumns(source, target))
    }
};

const columnSource = {
    beginDrag(props) {
        return {
            columnIdx: props.idx
        }
    },
    endDrag(props, monitor, component) {
        const dropResult = monitor.getDropResult();
        if(!dropResult) return;
        component.dispatchProps.replaceColumns(props.idx, dropResult.dropItemIdx);
    }
};

const collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
};

class Column extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showingCreateCardModal: false
        };
        this.closeCreateCardModal = this.closeCreateCardModal.bind(this);
        this.openCreateCardModal = this.openCreateCardModal.bind(this);
        this.addCard = this.addCard.bind(this);
        this.onModalEntered = this.onModalEntered.bind(this);
    }

    closeCreateCardModal() {
        this.setState({ showingCreateCardModal: false })
    }

    openCreateCardModal() {
        this.setState({ showingCreateCardModal: true })
    }

    onModalEntered() {
        setTimeout(() => this.refs.text.focus(), 10)
    }

    makeCards(cards) {
        const { removeCard, changeCardColor, idx } = this.props;
        return cards.map((c, i) => {
            return (
                <BoardCard key={i} idx={i} parent={idx}>
                    <Card removeCard={removeCard.bind(this, {columnIdx: idx, cardIdx: i})}
                          changeCardColor={changeCardColor.bind(this, {columnIdx: idx, cardIdx: i})}
                          idx={i} text={c.text} parent={idx} color={c.color} />
                </BoardCard>
            )
        })
    }

    addCard(e) {
        e.preventDefault();
        const text = this.refs.text.value.trim();
        const columnIdx = this.props.idx;
        if(text) {
            this.props.addCard({columnIdx, text, color: '#2196f3'});
            this.closeCreateCardModal();
        }
    }

    render() {
        const { idx, name, removeColumn, connectDragSource, isDragging } = this.props;
        const cards = this.makeCards(this.props.cards);
        const style = isDragging ? { opacity: 0.5 } : { opacity: 1 };
        return connectDragSource(
            <div data-idx={idx} className="column-component">
                <div style={style} className="panel panel-primary">
                    <div className="panel-heading">
                        <strong>{name}</strong>
                        <div className="pull-right">
                            <i onClick={this.openCreateCardModal} className="glyphicon glyphicon-plus"></i>
                            <i onClick={removeColumn} className="glyphicon glyphicon-trash"></i>
                        </div>
                    </div>
                    <BoardColumnPanelBody target="panel-body" parent={idx}>
                        {cards}
                    </BoardColumnPanelBody>
                </div>

                {/* modal for creating new card */}
                <Modal backdrop="static"
                       className="new-card-modal"
                       bsSize="small"
                       show={this.state.showingCreateCardModal}
                       onEntered={this.onModalEntered}
                       onHide={this.closeCreateCardModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create card</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="form-horizontal" onSubmit={this.addCard}>
                            <div className="form-group">
                                <label className="col-md-2 control-label">Text: </label>
                                <div className="col-md-10">
                                    <input ref="text" type="text" className="form-control" />
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-default" onClick={this.closeCreateCardModal}>Close</button>
                        <button className="btn btn-success" type="submit" onClick={this.addCard}>Create</button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }

}

Column.propTypes = {
    cards: PropTypes.array.isRequired,
    idx: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    removeColumn: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
};

export default DragSource(dragItemTypes.COLUMN, columnSource, collect)(connect(null, mapDispatchToProps)(Column));