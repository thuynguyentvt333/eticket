import React, { useEffect, useState } from 'react';
import './ResultPayment.scss';
import axios from 'axios';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';

const ResultPayment = () => {
  const [result, setResult] = useState(null);
  const token = Cookies.get('token');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const cartId = urlParams.get('cartId');
    const responseCode = urlParams.get('vnp_ResponseCode');
    const transactionNo = urlParams.get('vnp_TransactionNo');
    const amount = urlParams.get('vnp_Amount');
    const bankCode = urlParams.get('vnp_BankCode');
    const orderInfo = urlParams.get('vnp_OrderInfo');
    const email = urlParams.get('email');
    const paymentDate = urlParams.get('vnp_PayDate');
    const txnRef = urlParams.get('vnp_TxnRef');

    const resultData = {
      responseCode,
      transactionNo,
      amount,
      bankCode,
      orderInfo,
      email,
      paymentDate,
      cartId,
      txnRef
    };

    setResult(resultData);

    const formattedPaymentDate = dayjs(
      paymentDate.slice(0, 4) + '-' +
      paymentDate.slice(4, 6) + '-' +
      paymentDate.slice(6, 8) + 'T' +
      paymentDate.slice(8, 10) + ':' +
      paymentDate.slice(10, 12) + ':' +
      paymentDate.slice(12, 14)
    ).format('YYYY-MM-DDTHH:mm:ss');

    const payload = {
      cartIds: JSON.parse(cartId),
      vnp_TxnRef: txnRef,
      responseCode: responseCode === '00' ? 'Thanh toán thành công' : 'Thanh toán thất bại',
      paymentDate: formattedPaymentDate,
      amount: parseInt(amount) / 100,
      email,
    };

    console.log("check: ", payload)

    axios.post('http://localhost:8080/api/payment/infor-update', payload, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log('Payment info updated:', response.data);
      })
      .catch(error => {
        console.error('Error updating payment info:', error);
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
          <p>Số tiền: {(result.amount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
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
