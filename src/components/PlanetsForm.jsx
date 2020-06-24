import React, {useEffect, useState} from 'react';
import Input from "./common/Input";
import Button from './common/Button';
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from 'react-redux'
import { addPlanet, updatePlanet } from '../store/actions/planets'
import { getPlanetById } from '../store/selectors/planets'


import {planetsColumns} from "../services/planetsService";

const initialPlanetData = planetsColumns.reduce((columns, columnName) => {
    columns[columnName] = '';
    return columns;
}, {})

const PlanetsForm = ({setPlanets, planets, history, match}) => {
    const [formErrors, setFormErrors] = useState({});
    const [planetData, setPlanetData] = useState({...initialPlanetData});
    const [editMode, setEditMode] = useState(false);
    const dispatch = useDispatch();
    const ddata = useSelector(state => getPlanetById(state, match.params.id))[0]

    useEffect(() => {
        const planetId = match.params.id;
        if (planetId === "new") return;

        setPlanetData(ddata)
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
        const errors = validate(planetData);

        if (Object.keys(errors).length) {
            return;
        }

        if (editMode) {
            dispatch(updatePlanet(planetData))
        } else {
            dispatch(addPlanet({...planetData, beloved: false, id: nanoid()}))
            // setPlanets( planets, {...planetData, beloved: false, id: nanoid()});
        }
        history.push('/planets')
    }

    const handleChange = (event) => {
        const {currentTarget: input} = event;
        const data = {...planetData};
        const errors = {...formErrors};
        if (errors[input.name]) {
            delete errors[input.name];
        }

        data[input.name] = input.value;
        setPlanetData(data);
        setFormErrors(errors)
        console.log(input.value)
    }

    return (
        <form>
            {planetsColumns.map(planetsColName => (
                <Input
                    key={planetsColName}
                    name={planetsColName}
                    label={planetsColName[0].toUpperCase() + planetsColName.slice(1)}
                    value={planetData[planetsColName]}
                    type={planetsColName === 'beloved' ? 'checkbox' : 'input'}
                    error={formErrors[planetsColName]}
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

export default PlanetsForm;