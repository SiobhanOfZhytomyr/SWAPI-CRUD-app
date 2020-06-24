import React from 'react';
import {Link} from "react-router-dom";
import Table from '../common/Table'
import { useSelector, useDispatch } from 'react-redux';
import { getAllPeople, getVisiblePeople, getPeopleFilter } from '../../store/selectors/people';
import { deletePerson, changeBelovedStatus } from '../../store/actions/people';
import {VISIBILITY_FILTER, set_filter} from '../../store/actions/visibilityFilters';

const PeoplePage = () => {
    const dispatch = useDispatch();
    const people = useSelector(state => getVisiblePeople(state));
    const currFilter = useSelector(state => getPeopleFilter(state))

    const handleBelovedStatus = id => {
        dispatch(changeBelovedStatus(id));
    }

    const handleDelete = (id) => {
        dispatch(deletePerson(id));
    }

    const getColumns = () => {
        if (!people.length) return [];

        return Object.keys(people[0]).map(colName => {
            if (colName === 'beloved') {
                return {
                    colName,
                    content: ({beloved, id}) => (
                        <input
                            type="checkbox"
                            checked={beloved}
                            onChange={() => handleBelovedStatus(id)}
                        />
                    )
                }
            }
            if (colName === 'name') {
                return {
                    colName,
                    content: ({name, id}) => (
                        <Link style={{color: '#ffc107'}} to={`/people/${id}`}>{name}</Link>
                    )
                }
            }
            return {colName}
        })
    }

    return (
        <div>
            <h3>People from Star Wars Universe</h3>
            <Link
                to={"/people/new"}
                className="btn btn-warning"
                style={{marginBottom: 25}}
            >
                New Person
            </Link>
            <div className="form-check form-check-inline ml-3">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" 
                onChange={() => dispatch(set_filter(VISIBILITY_FILTER.ALL))} 
                checked={currFilter === VISIBILITY_FILTER.ALL ? true : false}/>
                <label className="form-check-label" for="inlineRadio1">Show all people</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"
                onChange={() => dispatch(set_filter(VISIBILITY_FILTER.BELOVED))} 
                checked={currFilter === VISIBILITY_FILTER.BELOVED ? true : false}/>
                <label className="form-check-label" for="inlineRadio2">Show beloved</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"
                onChange={() => dispatch(set_filter(VISIBILITY_FILTER.NOT_BELOVED))} 
                checked={currFilter === VISIBILITY_FILTER.NOT_BELOVED ? true : false}/>
                <label className="form-check-label" for="inlineRadio3">Show not beloved</label>
            </div>
            <Table
                columns={getColumns()}
                data={Object.values(people)}
                tableDescriptor="People"
                onDelete={handleDelete}
            />
        </div>

    );
};

export default PeoplePage;
