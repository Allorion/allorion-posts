"use client"

import { FC, Fragment, useState } from "react";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import { usePost } from "../hooks/usePosts";
import { Button, CardActionArea, Pagination, Skeleton } from "@mui/material";
import { useRouter } from "next/navigation";

const PostList: FC = () => {

    const router = useRouter();

    const [page, setPage] = useState<number>(1)

    const { data, isLoading } = usePost(page)

    const renderSkeleton = () => {

        const listSkeleton: React.JSX.Element[] = []

        for (let i: number = 0; i < 20; i++) {
            listSkeleton.push(
                <Card sx={{ width: 345, height: 400 }} key={i}>
                    <CardActionArea>
                        <Skeleton variant="rectangular" height={140} />
                        <CardContent>
                            <Skeleton width="60%" />
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                        </CardContent>
                    </CardActionArea>
                </Card>
            )
        }
        return listSkeleton
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const navigateToPost = (id: number) => {
        router.push(`/${id}`);
    };

    return (
        <Fragment>
            <div className='home_post-list'>
                {isLoading && renderSkeleton()}
                {data?.map((opt, index) => (
                    <div className="card" key={index}>
                        <div className="card-img-holder">
                            <img src={`https://via.assets.so/furniture.png?id=${opt.id}&q=95&w=400&h=240&fit=fill`} alt="Blog image" />
                        </div>
                        <h3 className="blog-title">{opt.title}</h3>
                        <span className="blog-time">Monday Jan 20, 2020</span>
                        <p className="description">
                            {opt.body}
                        </p>
                        <div className="options">
                            <Button color={'info'} variant={'text'} onClick={() => navigateToPost(opt.id)}>Читать пост...</Button>
                        </div>
                    </div>
                ))}
            </div>
            {data !== undefined && <Pagination count={100 / 20} page={page} onChange={handleChange} />}
        </Fragment>
    )
}

export default PostList;