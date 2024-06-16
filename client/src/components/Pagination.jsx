import React from 'react';
import { Pagination, PaginationItem} from "@mui/material";
import { Link } from "react-router-dom";
import {styled} from "@mui/material/styles";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector } from 'react-redux';
import { getPosts } from '../actions/Posts';

const Styledul = styled('ul')({
    justifyContent: 'space-around',
});

const Paginate = ({page})=>{
    const dispatch = useDispatch();
    const {numberOfPages} = useSelector((state) => state.posts);
    useEffect(() => {
        if(page) dispatch(getPosts(page));
    }, [page]);

    return (
        <Pagination
            count={numberOfPages}
            page={Number(page) || 1}
            size='medium'
            color="primary"
            variant='outlined'
            // sx={{display: 'flex', justifyContent: 'center'}}
            renderItem={(item) => (
                <PaginationItem 
                    {...item}
                    component={Link}
                    to={`/posts?page=${item.page}`}    
                />
            )}
        />
    )
}

export default Paginate;