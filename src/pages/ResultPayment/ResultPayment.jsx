import React, { useEffect, useState } from 'react';
import './ResultPayment.scss';

const ResultPayment = () => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const responseCode = urlParams.get('vnp_ResponseCode');
    const transactionNo = urlParams.get('vnp_TransactionNo');
    const amount = urlParams.get('vnp_Amount');
    const bankCode = urlParams.get('vnp_BankCode');
    const orderInfo = urlParams.get('vnp_OrderInfo');
    const email = urlParams.get('email');

    setResult({
      responseCode,
      transactionNo,
      amount,
      bankCode,
      orderInfo,
      email,
    });
  }, []);

  if (!result) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`result-payment ${result.responseCode === '00' ? 'success' : 'error'}`}>
      {result.responseCode === '00' ? (
        <div className="result-content">
          <h1>Thanh toán thành công!</h1>
          <p>Email: {result.email}</p>
          <p>Mã giao dịch: {result.transactionNo}</p>
          <p>Số tiền: {(result.amount / 100).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
          <p>Ngân hàng: {result.bankCode}</p>
          <p>Thông tin đơn hàng: {result.orderInfo}</p>
        </div>
      ) : (
        <div className="result-content">
          <h1>Thanh toán thất bại!</h1>
          <p>Email: {result.email}</p>
          <p>Mã lỗi: {result.responseCode}</p>
          <p>Vui lòng thử lại hoặc liên hệ hỗ trợ.</p>
        </div>
      )}
    </div>
  );
};

export default ResultPayment;
