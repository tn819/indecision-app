//babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch
class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            options: this.props.options
        };
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
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

    componentWillUnmount() {
        console.l
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
        alert(option);
    }

    render() {
        const subtitle = 'Put your life in the hands of a computer';
        return (
            <div>
                <Header subtitle={subtitle}/>
                <Action 
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options 
                    options={this.state.options}
                    handleDeleteOption={this.handleDeleteOption}
                    handleDeleteOptions={this.handleDeleteOptions}
                />
                <AddOption 
                    handleAddOption={this.handleAddOption}

                />
            </div>
        );
    }
}

IndecisionApp.defaultProps = {
    options: ['thing1', 'thing2']
}

const Header = props => {   
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    );
};
Header.defaultProps = {
    title: 'Indecision'
}

const Action = (props) => {
    return (
        <div>
            <button 
                onClick={props.handlePick}
                disabled={!props.hasOptions}
            >
                What should I do?
            </button>
        </div>
    );
};

const Options = props => {
    return (
        <div>
        {
            props.options.map(
                (option,index) => (
                    <Option 
                        key={index} 
                        optionText={option}
                        handleDeleteOption = {props.handleDeleteOption}
                    />
                )
            )
        }
        <button onClick={props.handleDeleteOptions}>Remove All</button>

            
        </div>
    );
};

const Option = props => {
    return (
        <div>
            {props.optionText}
            <button 
                onClick={e => {
                    props.handleDeleteOption(props.optionText);
                }
            }>
                Delete
            </button>
        </div>
    );
};

class AddOption extends React.Component {
    constructor(props){
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state ={
            error: undefined
        };
    }
    
    handleAddOption(e){
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);
        this.setState(() => ({ error }));

        if(!error) {
            e.target.elements.options.value= '';
        }
    }
    render(){
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option"></input>
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));