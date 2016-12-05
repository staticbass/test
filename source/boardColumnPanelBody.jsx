import React  from 'react';
import { replaceCards } from './core/actions';
import { DropTarget } from 'react-dnd';
import { dragItemTypes } from './core/dragItemTypes';

const cardTarget = {
    drop({ parent }, monitor) {
        if(monitor.didDrop()) return;
        return { parent };
    }
};

const collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: true })
    };
};

class BoardColumnPanelBody extends React.Component {
    render() {
        const { connectDropTarget, isOver } = this.props;
        const style = {
            border: isOver ? '1px dashed black' : 'none'
        };
        return connectDropTarget(
            <div style={style} className="panel-body">
                {this.props.children}
            </div>
        )
    }
}

export default DropTarget(dragItemTypes.CARD, cardTarget, collect)(BoardColumnPanelBody);