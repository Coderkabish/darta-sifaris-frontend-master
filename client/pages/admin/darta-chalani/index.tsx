import Layout from '../../../components/Layout/layout';
// eslint-disable-next-line import/extensions
import { NextPageWithLayout } from '../../_app';

// eslint-disable-next-line max-len
const Darta: NextPageWithLayout = () => (
        <>
            Hello Darta Page
        </>
    );

Darta.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Darta;
