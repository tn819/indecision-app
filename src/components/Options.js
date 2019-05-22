import React from 'react';
import Option from './Option';

const Options = (props) => (
    <div>
        <div className="widget-header">
            <h3 className="widget-header widget-header__title">Your Options</h3>
            <button 
                onClick={props.handleDeleteOptions}
                className="button button--link"
            >
                Remove All
            </button> 
        </div>
        <div >
            {props.options.length === 0 && <p className="widget-message">Please add an option to get started</p>}
            {props.options.map(
                (option,index) => (
                    <Option 
                        key={index} 
                        optionText={option}
                        count={index + 1}
                        handleDeleteOption = {props.handleDeleteOption}
                    />
                )
            )}
        </div>
        
    
    </div>
);

export default Options;