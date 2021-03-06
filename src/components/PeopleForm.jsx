import React, {useEffect, useState} from 'react';
import Input from "./common/Input";
import Button from './common/Button';
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from 'react-redux'
import { addPerson, updatePerson } from '../store/actions/people'
import { getPersonById } from '../store/selectors/people'


import {peopleColumns} from "../services/peopleService";

const initialPersonData = peopleColumns.reduce((columns, columnName) => {
    columns[columnName] = '';
    return columns;
}, {})

const PeopleForm = ({setPeople, people, history, match}) => {
    const [formErrors, setFormErrors] = useState({});
    const [personData, setPersonData] = useState({...initialPersonData});
    const [editMode, setEditMode] = useState(false);
    const dispatch = useDispatch();
    const ddata = useSelector(state => getPersonById(state, match.params.id))[0]

    useEffect(() => {
        const personId = match.params.id;
        if (personId === "new") return;

        setPersonData(ddata)
        setEditMode(true);
        console.log(ddata)
    }, [])

    const validate = (data) => { // super simple validation
        let errors = {};
        Object.entries(data).map(([propKey, propVal]) => {
            if (!propVal && !propKey.includes('beloved')) {
                errors = {...errors, [propKey]: 'Field should not be empty'};
            }
        })
        setFormErrors(errors);
        return errors
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const errors = validate(personData);

        if (Object.keys(errors).length) {
            return;
        }

        if (editMode) {
            dispatch(updatePerson(personData))
        } else {
            dispatch(addPerson({...personData, beloved: false, id: nanoid()}))
            // setPeople( people, {...personData, beloved: false, id: nanoid()});
        }
        history.push('/')
    }

    const handleChange = (event) => {
        const {currentTarget: input} = event;
        const data = {...personData};
        const errors = {...formErrors};
        if (errors[input.name]) {
            delete errors[input.name];
        }

        data[input.name] = input.value;
        setPersonData(data);
        setFormErrors(errors)
        console.log(input.value)
    }

    return (
        <form>
            {peopleColumns.map(peopleColName => (
                <Input
                    key={peopleColName}
                    name={peopleColName}
                    label={peopleColName[0].toUpperCase() + peopleColName.slice(1)}
                    value={personData[peopleColName]}
                    type={peopleColName === 'beloved' ? 'checkbox' : 'input'}
                    error={formErrors[peopleColName]}
                    onChange={event => handleChange(event)}
                />
            ))}
            <Button
                onClick={event => onSubmit(event)}
                label="Save"
                disabled={Object.keys(formErrors).length}
                classes="btn btn-dark"
            />
        </form>
    );
};

export default PeopleForm;
