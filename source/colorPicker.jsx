import React, { PropTypes } from 'react';

class ColorPicker extends React.Component {

    makeColorBoxes(colors) {
        return colors.map((c, i) => {
            const bgColor = {backgroundColor: c};
            return <div
                style={bgColor}
                onClick={this.props.onColorChange}
                className="color-box"
                data-color={c}
                key={i}></div>
        })
    }

    render() {
        const boxes = this.makeColorBoxes(this.props.colors);
        return (
            <div className="color-picker-component">
                {boxes}
            </div>
        )
    }

}

ColorPicker.defaultProps = {
    colors: ['#2196f3', '#ff9800', '#e51c23', '#4caf50', '#9c27b0']
};

ColorPicker.propTypes = {
    onColorChange: PropTypes.func.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ColorPicker;