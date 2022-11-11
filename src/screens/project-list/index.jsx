import { List } from './list';
import { SearchPanel } from './search-panel';
import { useState, useEffect } from 'react';
import React from 'react';
import { cleanObject, useDebounce, useMount } from 'utils';
import qs from 'qs';

const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
    const [users, setUsers] = useState([]);
    const [param, setParam] = useState({
        name: '',
        personId: '',
    });
    const debounceParam = useDebounce(param, 3000);
    const [list, setList] = useState([]);
    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async (response) => {
            if (response.ok) {
                setList(await response.json());
            }
        });
    }, [debounceParam]);
    useMount(() => {
        fetch(`${apiUrl}/users`).then(async (response) => {
            if (response.ok) {
                setUsers(await response.json());
            }
        });
    });
    return (
        <div>
            <SearchPanel param={param} setParam={setParam} users={users} />
            <List list={list} users={users} />
        </div>
    );
};
