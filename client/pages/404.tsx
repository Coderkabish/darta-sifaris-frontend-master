import { useRouter } from 'next/router';
import { NextPageWithLayout } from './_app';

const Custom404: NextPageWithLayout = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/admin/dashboard');
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 style={{ fontSize: '48px' }} className="text-center mb-4">
        <strong>४०४</strong>
      </h1>
      <h3 className="text-center mb-3 fs-20 fs-400 mb-2">
        माफ गर्नुहोस्, यो पृष्ठ अवस्थित छैन।
      </h3>
      <button onClick={handleClick} className="btn btn-primary fw-600" type="button">
        ड्यासबोर्ड पृष्ठमा जानुहोस्
      </button>
    </div>
  );
};

export default Custom404;
