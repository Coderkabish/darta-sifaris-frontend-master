import { useRouter } from 'next/router';
import React from 'react';
import { NextPageWithLayout } from '../../../_app';
import Layout from '../../../../components/Layout/layout';

const SifarisCategory: NextPageWithLayout = () => {
    const router = useRouter();
    const { category } = router.query;
    return (
        <>
            Hello World {category}.
        </>

    );
};

SifarisCategory.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default SifarisCategory;
