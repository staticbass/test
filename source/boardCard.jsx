import React from 'react';
import { DropTarget } from 'react-dnd';
import { dragItemTypes } from './core/dragItemTypes';

const cardTarget = {
    drop({idx, parent}) {
        return { idx, parent }
    },
    canDrop(props, monitor) {
        return props.parent == monitor.getItem().parentIdx
    }
};

const collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop()
    };
};

class BoardCard extends React.Component {

    render() {
        const { connectDropTarget, isOver, canDrop } = this.props;
        const style = (isOver && canDrop) ? { border: '1px dashed black' } : {};
        return connectDropTarget(
            <div style={style} className="board-card-component">
                {this.props.children}
            </div>
        )
    }

}

export default DropTarget(dragItemTypes.CARD, cardTarget, collect)(BoardCard);