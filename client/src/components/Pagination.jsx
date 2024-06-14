import React from 'react';
import { Pagination, PaginationItem} from "@mui/material";
import { Link } from "react-router-dom";
import {styled} from "@mui/material/styles";

const Styledul = styled('ul')({
    justifyContent: 'space-around',
});

const Paginate = ()=>{
    return (
        <Pagination
            count={5}
            page={1}
            size='medium'
            color="primary"
            variant='outlined'
            // sx={{display: 'flex', justifyContent: 'center'}}
            renderItem={(item) => (
                <PaginationItem
                    {...item}
                    component={Link}
                    to={`/posts?page=${1}`}
                    
                />
            )}
        />
    )
}

export default Paginate;