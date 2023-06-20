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
      console.log(JSON.parse(lastMessage?.data));
      
      setBids(JSON.parse(lastMessage?.data)?.data?.bids?.map(item => {
        const itemObj = Object.assign({}, item);
        return {
          KLM: 7.00,
          KLB: itemObj[1],
          KLMD: 4.69,
          KLBD:7.00,
          KLM1: itemObj[0],
          KLB1: 7.00,
          KLM2: 6.22,
          KLB2: 7.00,

          KLM3: itemObj[0],
          KLB3: 3.99,
          KLM4: 3.99,
          KLB4: itemObj[1],

          KLM5: 3.99,
          KLB5: 5.62,
          KLM6: itemObj[0],
          KLB6: 7.00,

          KLM7: itemObj[0],
          KLB7: 3.99,
          KLM8: itemObj[0],
          KLB8: 7.00,

          KLM9: 3.99,
          KLB9: 7.00,
          KLM10: itemObj[0],
          KLB10: 3.25,

          // KLM11: itemObj[0],
          // KLB11: itemObj[1],
          // KLMD1: itemObj[0],
          // KLBD11: itemObj[1],
          // KLM12: itemObj[0],
          // KLB12: itemObj[1],
          // KLM13: itemObj[0],
          // KLB13: itemObj[1],

          // KLM14: itemObj[0],
          // KLB14: itemObj[1],
          // KLM15: itemObj[0],
          // KLB15: itemObj[1],

          // KLM16: itemObj[0],
          // KLB16: itemObj[1],
          // KLM17: itemObj[0],
          // KLB17: itemObj[1],

          // KLM18: itemObj[0],
          // KLB18: itemObj[1],
          // KLM19: itemObj[0],
          // KLB19: itemObj[1],

          // KLM20: itemObj[0],
          // KLB20: itemObj[1],
          // KLM21: itemObj[0],
          // KLB21: itemObj[1],
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
    },
    {
      headerGroup: "KL1",
      children: [
        {
          title: 'KLM1',
          dataIndex: 'KLM1'
        },
        {
          title: 'KLB1',
          dataIndex: 'KLB1'
        },
      ],
      dataIndex: 'KL1'
    },
    {
      headerGroup: "KL2",
      children: [
        {
          title: 'KLM2',
          dataIndex: 'KLM2'
        },
        {
          title: 'KLB2',
          dataIndex: 'KLB2'
        },
      ],
      dataIndex: 'KL2'
    },
    {
      headerGroup: "KL3",
      children: [
        {
          title: 'KLM3',
          dataIndex: 'KLM3'
        },
        {
          title: 'KLB3',
          dataIndex: 'KLB3'
        },
      ],
      dataIndex: 'KL3'
    },
    {
      headerGroup: "KL4",
      children: [
        {
          title: 'KLM4',
          dataIndex: 'KLM4'
        },
        {
          title: 'KLB4',
          dataIndex: 'KLB4'
        },
      ],
      dataIndex: 'KL4'
    },
    {
      headerGroup: "KL5",
      children: [
        {
          title: 'KLM5',
          dataIndex: 'KLM5'
        },
        {
          title: 'KLB5',
          dataIndex: 'KLB5'
        },
      ],
      dataIndex: 'KL5'
    },
    {
      headerGroup: "KL6",
      children: [
        {
          title: 'KLM6',
          dataIndex: 'KLM6'
        },
        {
          title: 'KLB6',
          dataIndex: 'KLB6'
        },
      ],
      dataIndex: 'KL6'
    },
    {
      headerGroup: "KL7",
      children: [
        {
          title: 'KLM7',
          dataIndex: 'KLM7'
        },
        {
          title: 'KLB7',
          dataIndex: 'KLB7'
        },
      ],
      dataIndex: 'KL7'
    },
    {
      headerGroup: "KL8",
      children: [
        {
          title: 'KLM8',
          dataIndex: 'KLM8'
        },
        {
          title: 'KLB8',
          dataIndex: 'KLB8'
        },
      ],
      dataIndex: 'KL8'
    },
    {
      headerGroup: "KL9",
      children: [
        {
          title: 'KLM9',
          dataIndex: 'KLM9'
        },
        {
          title: 'KLB9',
          dataIndex: 'KLB9'
        },
      ],
      dataIndex: 'KL9'
    },
    {
      headerGroup: "KL10",
      children: [
        {
          title: 'KLM10',
          dataIndex: 'KLM10'
        },
        {
          title: 'KLB10',
          dataIndex: 'KLB10'
        },
      ],
      dataIndex: 'KL10'
    },
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
          prevCountRef={prevCountRef.current}
        />
      </div>
    </>
  )
}
