import React from 'react';
import { DropTarget } from 'react-dnd';
import { dragItemTypes } from './core/dragItemTypes';

const columnTarget = {
    drop(props) {
        const dropItemIdx = props.idx;
        return { dropItemIdx }
    }
};

const collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
};

class BoardColumn extends React.Component {

    render() {
        const { connectDropTarget, isOver } = this.props;
        const style = isOver ? { border: '1px dashed black' } : {};
        return connectDropTarget(
            <div style={style} className="board-column-component">
                {this.props.children}
            </div>
        )
    }

}

export default DropTarget(dragItemTypes.COLUMN, columnTarget, collect)(BoardColumn);