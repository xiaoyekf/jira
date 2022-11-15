import { List } from './list';
import { SearchPanel } from './search-panel';
import React, { useState, useEffect } from 'react';
import { cleanObject, useDebounce, useMount } from 'utils';
import { useHttp } from 'utils/http';

export const ProjectListScreen = () => {
    const [users, setUsers] = useState([]);
    const [param, setParam] = useState({
        name: '',
        personId: '',
    });
    const debounceParam = useDebounce(param, 3000);
    const [list, setList] = useState([]);
    const client = useHttp();

    useEffect(() => {
        client('projects', { data: cleanObject(debounceParam) }).then(setList);
    }, [debounceParam]);
    useMount(() => {
        client('users').then(setUsers);
    });
    return (
        <div>
            <SearchPanel param={param} setParam={setParam} users={users} />
            <List list={list} users={users} />
        </div>
    );
};
