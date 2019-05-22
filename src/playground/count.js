class Counter extends React.Component {
    constructor(props){
        super(props);
        this.addOne = this.addOne.bind(this);
        this.minusOne = this.minusOne.bind(this);
        this.reset = this.reset.bind(this);
        this.state = {
            count: 0
        };
    }

    componentDidMount()
    addOne(){
        this.setState((prevState) => {
            return {
                count: prevState.count + 1
            };
        });
    }

    minusOne(){
        this.setState((prevState) => {
            return {
                count: prevState.count - 1
            };
        });
    }

    reset(){
        this.setState(() => {
            return {
                count: 0
            };
        });

    }

    render() {
        return (
            <div>
                <h1>Count:{this.state.count}</h1>
                <button onClick={this.addOne}>+1</button>
                <button onClick={this.minusOne}>-1</button>
                <button onClick={this.reset}>reset</button>
            </div>
        );
    }
}

ReactDOM.render(<Counter />, document.getElementById('app'));
// const userName="T Grizzy";
// const userAge = 28;
// const userLocation = "D";

// const user = {
//     name: userName,
//     age: userAge,
//     location: userLocation
// };

// function getLocation(location){
//     if(location){
//         return <p>Location: {location}</p>;
//     }
// }

// const template = (
//     <div>
//         <h1> {user.name ? user.name : 'Anonymous'} </h1>
//         {(user.age && user.age >= 18) && <p> Age: {user.age} </p>}
//         {getLocation(user.location)}
//     </div>  
// );

// let count = 0;

// // some attributes: id
// // some renamed: class > className (reserved keyword)

// const addOne = () => {
//     count++;
//     renderCounterApp();
// };

// const minusOne = () => {
//     count--;
//     renderCounterApp();
// };

// const reset = () => {
//     count = 0;
//     renderCounterApp();
// };


// const renderCounterApp = () => {
//     const templateTwo = (
//         <div>
//             <h1>Count:{count}</h1>
//             <button onClick={addOne}>+1</button>
//             <button onClick={minusOne}>-1</button>
//             <button onClick={reset}>reset</button>
//         </div>
//     );

//     ReactDOM.render(templateTwo, appRoot);
// }
// renderCounterApp();