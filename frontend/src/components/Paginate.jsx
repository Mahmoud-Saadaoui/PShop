import { Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  const navigate = useNavigate();

  if (pages <= 1) return null;

  return (
    <Pagination>
      {[...Array(pages).keys()].map((x) => (
        <Pagination.Item
          key={x + 1}
          active={x + 1 === page}
          onClick={() => {
            const path = !isAdmin
              ? keyword
                ? `/search/${keyword}/page/${x + 1}`
                : `/page/${x + 1}`
              : `/admin/productlist/${x + 1}`;
            navigate(path);
          }}
        >
          {x + 1}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default Paginate;
