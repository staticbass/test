/**
 * Created by supervlad on 23.04.16.
 */

const initial = [];

const boardReducer = (state = initial, action) => {

    let columns = [...state],
        sourceCard = null,
        column = null;

    switch(action.type) {
        case 'ADD_COLUMN':
            return [...state, action.columnData];
        case 'ADD_CARD':
            column = columns[action.columnIdx];
            column.cards.push({text: action.text, color: action.color});
            return columns;
        case 'REMOVE_CARD':
            column = columns[action.columnIdx];
            column.cards.splice(action.cardIdx, 1);
            return columns;
        case 'REMOVE_COLUMN':
            columns.splice(action.columnIdx, 1);
            return columns;
        case 'CHANGE_CARD_COLOR':
            column = columns[action.columnIdx];
            column.cards[action.cardIdx].color = action.color;
            return columns;
        case 'REPLACE_COLUMNS':
            if(action.source == action.target) return columns;
            sourceCard = columns[action.source];
            columns[action.source] = columns[action.target];
            columns[action.target] = sourceCard;
            return columns;
        case 'MOVE_CARD_TO_COLUMN':
            if(action.source.cardIdx == action.target.cardIdx) return columns;
            sourceCard = columns[action.source.parentIdx].cards.splice(action.source.cardIdx, 1)[0];
            columns[action.target.parentIdx].cards.push(sourceCard);
            return columns;
        case 'REPLACE_CARDS':
            let sourceCards = columns[action.source.parentIdx].cards;
            let targetCards = columns[action.target.parentIdx].cards;
            sourceCard = sourceCards[action.source.cardIdx];
            sourceCards[action.source.cardIdx] = targetCards[action.target.cardIdx];
            targetCards[action.target.cardIdx] = sourceCard;
            return columns;
        default:
            return state;
    }

};

export default boardReducer;