"use client"

import { useParams } from "next/navigation";
import { FC, Fragment } from "react";
import { usePostById } from "../home/hooks/usePostById";
import { useComments } from "../home/hooks/useComments";
import { Avatar, Container, Divider, List, ListItem, ListItemAvatar, ListItemText, Skeleton, Typography } from "@mui/material";
import "./styles/post.style.scss"
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';

const Post: FC = () => {

    const params: { id: string } = useParams();

    const { data: post, isLoading: isLoadingPost } = usePostById(params.id)
    const { data: comments, isLoading: isLoadingComments } = useComments(params.id)

    return (
        <Fragment>
            <Container className="post_container">
                <div className="post_paper">
                    <div className="card">

                        <div className="thumbnail">
                            {isLoadingPost ?
                                <Skeleton variant="rectangular" width={530} height={320} />
                                :
                                <img className="left" src={`https://via.assets.so/furniture.png?id=${post?.id}&q=95&w=530&h=320&fit=fill`} />
                            }
                        </div>
                        <div className="right">
                            {isLoadingPost ? <Skeleton variant="text" sx={{ fontSize: '0.8rem' }} />
                                : <h1>{post?.title}</h1>
                            }
                            {isLoadingPost ? <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                                :
                                <div className="author"><img src={`https://randomuser.me/api/portraits/men/${post?.userId}.jpg`} />
                                    <p>Igor MARTY</p>
                                </div>
                            }
                            <div className="separator"></div>
                            {isLoadingPost ?
                                <Fragment>
                                    <Skeleton variant="text" sx={{ fontSize: '0.8rem' }} />
                                    <Skeleton variant="text" sx={{ fontSize: '0.8rem' }} />
                                    <Skeleton variant="text" sx={{ fontSize: '0.8rem' }} />
                                    <Skeleton variant="text" sx={{ fontSize: '0.8rem' }} />
                                    <Skeleton variant="text" sx={{ fontSize: '0.8rem' }} />
                                    <Skeleton variant="text" sx={{ fontSize: '0.8rem' }} />
                                    <Skeleton variant="text" sx={{ fontSize: '0.8rem' }} />
                                    <Skeleton variant="text" sx={{ fontSize: '0.8rem' }} />
                                </Fragment>
                                : <p>{post?.body}</p>
                            }
                            <ul>
                                {isLoadingPost ?
                                    <li><Skeleton variant="circular" width={40} height={40} /></li>
                                    :
                                    <li><FavoriteBorderIcon fontSize="large" /></li>
                                }
                                {isLoadingPost ?
                                    <li><Skeleton variant="circular" width={40} height={40} /></li>
                                    :
                                    <li><ShareIcon fontSize="large" /></li>
                                }
                            </ul>
                        </div>
                        <div className="fab"
                            onClick={() => {
                                document.getElementById('comments-block')!.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            <ArrowDownwardIcon fontSize={'large'} />
                        </div>
                    </div>
                </div>
                <div className="comments_paper" id="comments-block">
                    <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                        {comments?.map((opt, index) => (
                            <Fragment key={index}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        {isLoadingComments ?
                                            <Skeleton variant="circular" width={40} height={40} />
                                            :
                                            <Avatar />
                                        }
                                    </ListItemAvatar>
                                    {isLoadingComments ?
                                        <ListItemText>
                                            <Skeleton variant="text" sx={{ fontSize: '0.8rem' }} width={'60%'} />
                                            <Skeleton variant="text" sx={{ fontSize: '0.8rem' }} />
                                            <Skeleton variant="text" sx={{ fontSize: '0.8rem' }} />
                                        </ListItemText>
                                        :
                                        <ListItemText
                                        primary={opt.email}
                                        secondary={
                                            <Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {opt.name}
                                                </Typography>
                                                {` — ${opt.body}`}
                                            </Fragment>
                                        }
                                    />
                                    }
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </Fragment>
                        ))}
                    </List>
                </div>
            </Container>
        </Fragment>
    )
}

export default Post