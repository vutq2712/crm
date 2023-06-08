import { useSession } from '@app/hooks/session'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { googleLogout } from '@react-oauth/google'
import { useRouter } from 'next/router'
import { clearUserCredential } from '@app/services/auth';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import DataTable, { ColumnProps } from '@app/kit/components/table/data-table';


export function Index() {
  const { userInfo, logout } = useSession();
  const router = useRouter();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const logOut = async () => {
    await googleLogout();
    await logout();
    // await clearUserCredential();
    // await router.push('/auth/login')
  };

  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [socketUrl, setSocketUrl] = useState('wss://ws.bitstamp.net');

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  const prevCountRef = useRef<any>([]);

  const apiCall = {
    event: "bts:subscribe",
    data: { channel: "order_book_btcusd" },
  };

  useEffect(() => {
    if (lastMessage !== null && readyState === ReadyState.OPEN) {
      setBids(JSON.parse(lastMessage?.data)?.data?.bids?.map(item => {
        const itemObj = Object.assign({}, item);
        return {
          KLM: itemObj[0],
          KLB: itemObj[1],
          KLMD: itemObj[0],
          KLBD: itemObj[1],
        }
      }));
      setAsks(JSON.parse(lastMessage?.data)?.data?.asks);

    }
  }, [lastMessage]);

  const handleClickChangeSocketUrl = useCallback(
    () => setSocketUrl('wss://ws.bitstamp.net'),
    []
  );

  const handleClickSendMessage = useCallback(() => sendMessage(JSON.stringify(apiCall)), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  useEffect(() => {
    prevCountRef.current = bids;
  }, [bids])

  useEffect(()=>{
    handleClickSendMessage()
  },[])

  const columnConfig: ColumnProps[] = [
    {
      headerGroup: "KL",
      children: [
        {
          title: 'KLM',
          dataIndex: 'KLM'
        },
        {
          title: 'KLB',
          dataIndex: 'KLB'
        },
      ],
      dataIndex: 'KL'
    },
    {
      title: 'KLMD',
      dataIndex: 'KLMD'
    },
    {
      title: 'KLBD',
      dataIndex: 'KLBD'
    }
  ]

  return (
    <>
      {/* {userInfo && (
        <div>
          <img src={userInfo.picture} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {userInfo.name}</p>
          <p>Email Address: {userInfo.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      )} */}
      <div>
        <button onClick={handleClickChangeSocketUrl}>
          Click Me to change Socket Url
        </button>
        <button
          onClick={handleClickSendMessage}
          disabled={readyState !== ReadyState.OPEN}
        >
          Click Me to send 'Hello'
        </button>
        <span>The WebSocket is currently {connectionStatus}</span>
        <DataTable
          rowData={bids}
          columnConfig={columnConfig}
        />
      </div>
    </>
  )
}
