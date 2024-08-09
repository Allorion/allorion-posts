"use client"

import { Button, Container, Typography } from '@mui/material';
import PostList from './home/components/PostList.component';
import './home/static/styles/home.style.scss'
import { Fragment, useState } from 'react';
import ModalAddPostComponent from './home/components/ModalAddPost.component';

export default function Home() {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Fragment>
      <Container maxWidth={'xl'}>
        <header className='home_header'>
          <Typography variant="h3" component="h1" gutterBottom>
            Список постов
          </Typography>
          <Button variant="outlined" onClick={handleClickOpen}>
            Создать пост
          </Button>
        </header>
        <div className='home_paper'>
          <PostList />
        </div>
      </Container>
      <ModalAddPostComponent open={open} setOpen={setOpen} />
    </Fragment>
  );
}
