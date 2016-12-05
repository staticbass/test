import React, { PropTypes } from 'react';
import '../assets/bootstrap-theme/dist/css/bootstrap-paper.min.css';
import { connect } from 'react-redux';
import BoardColumn from './boardColumn.jsx';
import Column from './column.jsx';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Modal from 'react-bootstrap/lib/modal';
import { addColumn, removeColumn } from './core/actions';
import '../styles/main.scss';

const mapStateToProps = state => ({columns: state});
const mapDispatchToProps = dispatch => {
   return {
       addColumn: data => dispatch(addColumn(data)),
       removeColumn: idx => dispatch(removeColumn(idx))
   }
};

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showingCreateColumnModal: false
        };
        this.closeCreateColumnModal = this.closeCreateColumnModal.bind(this);
        this.openCreateColumnModal = this.openCreateColumnModal.bind(this);
        this.addColumn = this.addColumn.bind(this);
        this.onModalEntered = this.onModalEntered.bind(this);
    }

    closeCreateColumnModal() {
        this.setState({
            showingCreateColumnModal: false
        })
    }

    openCreateColumnModal() {
        this.setState({ showingCreateColumnModal: true });
    }

    addColumn(e) {
        e.preventDefault();
        const name = this.refs.name.value.trim();
        if(name) {
            this.props.addColumn({ name, cards: [] });
            this.closeCreateColumnModal();
        }
    }

    makeColumns(columns) {
        const { removeColumn } = this.props;
        return columns.map(({ name, cards }, i) => {
            return (
                <BoardColumn key={i} idx={i}>
                    <Column removeColumn={removeColumn.bind(this, i)} idx={i} cards={cards} name={name} />
                </BoardColumn>
            )
        });
    }

    onModalEntered() {
        setTimeout(() => this.refs.name.focus(), 10)
    }

    render() {
        const columns = this.makeColumns(this.props.columns);
        return (
            <div className="board-component">
                <div className="clearfix">
                    <div className="columns">
                        {columns}
                        <button onClick={this.openCreateColumnModal} className="btn btn-success">Create</button>
                    </div>
                </div>

                {/* modal for creating new empty column */}
                <Modal backdrop="static"
                       className="new-column-modal"
                       bsSize="small"
                       show={this.state.showingCreateColumnModal}
                       onEntered={this.onModalEntered}
                       onHide={this.closeCreateColumnModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create column</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="form-horizontal" onSubmit={this.addColumn}>
                            <div className="form-group">
                                <label className="col-md-2 control-label">Name: </label>
                                <div className="col-md-10">
                                    <input ref="name" type="text" className="form-control"/>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-default" onClick={this.closeCreateColumnModal}>Close</button>
                        <button className="btn btn-success" type="submit" onClick={this.addColumn}>Create</button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }

}

Board.propTypes = {
    columns: PropTypes.array.isRequired,
    addColumn: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(Board));


