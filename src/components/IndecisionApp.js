import React from 'react';
import AddOption from './AddOption';
import Action from './Action';
import Header from './Header';
import Options from './Options';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            options: this.props.options,
            selectedOption: undefined
        };
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleClearSelectedOption = this.handleClearSelectedOption.bind(this);
    }

    handleAddOption(option){
        if(!option){
            return "Enter valid value to add item";
        } else if (this.state.options.indexOf(option) > -1){
            return "This option already exists";
        } else {
            this.setState(prevState => ({
                options: prevState.options.concat(option)
            }));
        }
        
    }

    componentDidMount() {
        try{
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if(options) {
                this.setState(() => ({options}));
            }
        } catch(e){

        }
        
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }


    handleDeleteOption(optionToRemove) {
        this.setState((prevState)=> ({options: prevState.options.filter(
            option => {
                return optionToRemove !== option;
            }
        )}));
    }

    handleDeleteOptions() {
        this.setState(()=> ({options: []}));
    }

    handlePick() {
        const pickIndex = Math.floor(Math.random()*this.state.options.length);
        const option = this.state.options[pickIndex];
        this.setState({
            selectedOption: option
        })
    }

    handleClearSelectedOption() {
        this.setState({
            selectedOption: undefined
        })
    }

    render() {
        const subtitle = 'Put your life in the hands of a computer';
        return (
            <div>
                <Header subtitle={subtitle}/>
                <div className="container">
                    <Action 
                        hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick}
                    />
                    <div className="widget">
                        <Options 
                            options={this.state.options}
                            handleDeleteOption={this.handleDeleteOption}
                            handleDeleteOptions={this.handleDeleteOptions}
                        />
                        <AddOption 
                            handleAddOption={this.handleAddOption}
                        />
                    </div>
                    
                </div>

                <OptionModal
                    selectedOption={this.state.selectedOption}
                    handleClearSelectedOption={this.handleClearSelectedOption}
                />
            </div>
        );
    }
}

IndecisionApp.defaultProps = {
    options: ['thing1', 'thing2']
}