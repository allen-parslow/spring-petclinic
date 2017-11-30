import _ from "lodash";
import React from "react";

const nullValidator = [];

const VALIDATION_DEFAULT = {valid: true};

const getValidation = (field, validation) => {
    return (validation || {})[field] || VALIDATION_DEFAULT;
};

const doValidate = (field, value, isValid, text) => {
    let validation = {
        valid: isValid(value),
        value: value
    };

    if (!validation.valid) {
        validation.text = text;
    }

    //console.log("Validation " + field + ".required=" + JSON.stringify(validation));  
    let result = {};
    result[field] = validation;

    return result;
};

const validateField = (field, value, validators) => {
    let result = null;

    _.some(validators, function(validate) {
        result = validate(field, value);
        return !result[field].valid;
      });

    return result;
};

const onChangeEvent = (e, props) => {
    props.src.onChange(
        props.field, 
        e.target.value,
        validateField(props.field, e.target.value, props.src.validators[props.field] || [])
    );
};

export const validatorTypes = {
    required: (field, value) => {
        return doValidate(field, value, (i) => !!i && i.trim().length > 0,  "Required");
    },
    min: (minLength) => {
        return (field, value) => {
            return doValidate(field, value, (i) => !i || i.trim().length >= minLength,  "Min length: " + minLength);
        };
    },
    exactLength: (length) => {
        return (field, value) => {
            return doValidate(field, value, (i) => !i || i.trim().length == length,  "Length must be: " + length);
        };
    },
    digits: (field, value) => {
        return doValidate(field, value, (i) => !i || /^\d+$/.test(i),  "Digits Only");
    },
    regex: (matcher, text) => {
        return (field, value) => {
            return doValidate(field, value, (i) => matcher.test(i),  text);
        };
    }
};

export const ValidationWrapper = (props) => {

};

export const ValidatedInput = props => {
    let editing = props.src.editing; 
    let value = props.src.result[props.field];
    let editValue = props.src.changed ? props.src.changed[props.field] : value;
    let validation = getValidation(props.field, props.src.validation);

    return <div className={"form-group col-sm-" + props.size + " " + (editing ? !validation.valid ? "has-error" : "has-success" : "")}>
        <div>
            <label className="control-label">{props.label}</label>
        </div>
        {!editing ? value : <input className="form-control" 
            onBlur={(e) => onChangeEvent(e, props)}
            defaultValue={editValue}/>}
        <span className="help-block">{(editing && !validation.valid) ? validation.text: ""}</span> 
    </div>;
};

export const ValidatedSelect = props => {
    let editing = props.src.editing; 
    let value = props.src.result[props.field];
    let editValue = props.src.changed ? props.src.changed[props.field] : value;
    let validation = getValidation(props.field, props.src.validation);

    let displayValue = props.options.lookup(value);

    return <div className={"form-group col-sm-" + props.size + " " + (editing ? !validation.valid ? "has-error" : "has-success" : "")}>
        <div>
            <label className="control-label">{props.label}</label>
        </div>
        {!editing ? displayValue : 
            <select className="form-control" value={editValue}
                    onChange={e => onChangeEvent(e, props)}
                    onBlur={e => onChangeEvent(e, props)}>
                {!props.required ? <option value="" key={props.field + ".required"}></option>: null}
                {props.options.pairs.map((item) => <option value={item.key} key={props.field + item.key}>{item.value}</option>            
                )}
            </select>            
        }    
        <span className="help-block">{(editing && !validation.valid) ? validation.text: ""}</span> 
    </div>;
};

export const validateAll = (data, validators) => {
    var result = {};
    var invalidCount = 0;
    _.forOwn(validators, function(validate, key) {
        let validationData = validateField(key, data[key], validate);
        let validation = null;
        if (validationData) {
            validation = validationData[key];
        }
        if (validation && !validation.valid) {
            result[key] = validation;
            invalidCount++;
            //console.log("validate.all.result." + key + "=" + JSON.stringify(validation));
        }
    });
    return (invalidCount == 0 ? null: result);
};
