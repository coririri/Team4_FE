import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import CoinRechargeTemplate from '../template/coinRechargeTemplate';
import { getChargeCoin } from '../../apis/coin';

function CoinRechargePage() {
  const [page, setPage] = useState(1);
  const limits = 12;
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`getChargeCoin?cursor=${1 + 12 * (page - 1)}&limits=${limits}`],
    queryFn: () => getChargeCoin(1 + 12 * (page - 1), limits),
  });

  const navigate = useNavigate();
  useEffect(() => {
    // 로그인 상태가 아니면 로그인 레이아웃으로 이동
    if (localStorage.getItem('accessToken') === null) {
      navigate('/login', {
        replace: true,
      });
    }
  }, []);

  const onHandleChangePage = (type: 'right' | 'left') => {
    if (type === 'right') {
      setPage(() => page + 1);
    } else if (type === 'left') {
      setPage(() => page - 1);
    }
  };

  if (data && !isLoading && !isFetching) {
    return (
      <CoinRechargeTemplate coinRecharge={data} page={page} onChangePage={onHandleChangePage} />
    );
  }

  return (
    <div>Loading...</div>
  );
}

export default CoinRechargePage;
