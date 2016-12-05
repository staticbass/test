
export const addColumn = columnData => {
    return {
        type: 'ADD_COLUMN',
        columnData
    }
};

export const addCard = ({columnIdx, text, color}) => {
    return {
        type: 'ADD_CARD',
        columnIdx,
        text,
        color
    }
};

export const removeColumn = columnIdx => {
    return {
        type: 'REMOVE_COLUMN',
        columnIdx
    }
};

export const removeCard = ({columnIdx, cardIdx}) => {
    return {
        type: 'REMOVE_CARD',
        columnIdx,
        cardIdx
    }
};

export const changeCardColor = ({columnIdx, cardIdx, color}) => {
    return {
        type: 'CHANGE_CARD_COLOR',
        columnIdx,
        cardIdx,
        color
    }
};

export const replaceColumns = (source, target) => {
    return {
        type: 'REPLACE_COLUMNS',
        source,
        target
    }
};

export const moveCardToColumn = (source, target) => {
    return {
        type: 'MOVE_CARD_TO_COLUMN',
        source,
        target
    }
};

export const replaceCards = (source, target) => {
    return {
        type: 'REPLACE_CARDS',
        source,
        target
    }
};