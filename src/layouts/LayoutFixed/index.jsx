import React, { useEffect, useState } from 'react';
import styles from './index.less';
import NGDCHeader from '../ngdc/header';
import NGDCFooter from '../ngdc/footer';
import logo from '../../assets/logo.png';
import { DownloadOutlined } from '@ant-design/icons';
import {
  Layout,
  Menu,
  MenuProps,
  ConfigProvider,
  BackTop,
  Typography,
  Row,
  Col,
  Image,
} from 'antd';
const { Header, Content, Footer } = Layout;
import HeaderLab from '../HeaderLab';
import { history } from 'umi';
import enUS from 'antd/lib/locale/en_US';
import moment from 'moment';
moment.locale('en');
import {
  DatasetIcon,
  HomeIcon,
  ContactIcon,
  BiomarkerIcon,
  ExploreIcon,
  ResourceIcon,
  DocumentationIcon,
  BrowseIcon,
  BenchmarkIcon,
  OnlineIcon,
  LandscapeIcon, DrugIcon, VSIcon, LociIcon, GeneIcon, ToolIcon, AdvanceIcon
} from "../../components/Icons/index";
export default function (props) {
  // console.log(props);
  const [selectKey, setSelectkey] = useState('1');
  useEffect(() => {
    if (history.location.pathname.startsWith('/home')) {
      setSelectkey('1');
    } else if (history.location.pathname.startsWith('/variant')) {
      setSelectkey('2');
    } else if (history.location.pathname.startsWith('/explorevariant')) {
      setSelectkey('2');
    } else if (history.location.pathname.startsWith('/exploregene') ) {
      setSelectkey('3');
    } else if (history.location.pathname.startsWith('/gene')) {
      setSelectkey('3');
    } else if (history.location.pathname.startsWith('/advance')) {
      setSelectkey('4');
    } else if (history.location.pathname.startsWith('/toolkit') ) {
      setSelectkey('5');
    } else if (history.location.pathname.startsWith('/resource')) {
      setSelectkey('6');
    } else if (history.location.pathname.startsWith('/documentation')) {
      setSelectkey('7');
    } else if (history.location.pathname.startsWith('/contact')) {
      setSelectkey('8');
    }
    // console.log(history.location.pathname);
  }, [history.location]);
  const items = [
    {
      label: (
        <a
          onClick={() => {
            history.push('/home');
          }}
        >
          <strong style={{ color: '#252746' }}>Home</strong>
        </a>
      ),
      key: '1',
      icon: <HomeIcon />,
    },
    {
      label: (<a onClick={() => {history.push('/variant/CV');}}><strong style={{ color: '#252746' }}>Variant</strong></a>),
      key: '2',
      icon: <LociIcon />,
      children: [
        {
          label: (
            <a
              onClick={() => {
                history.push('/variant/CV');
              }}
            >
              <strong style={{ color: '#252746' }}>CV</strong>
            </a>
          ),
          key: '2-1',
        },
        {
          label: (
            <a
              onClick={() => {
                history.push('/variant/RV');
              }}
            >
              <strong style={{ color: '#252746' }}>
                RV
              </strong>
            </a>
          ),
          key: '2-2',
        },
        {
          label: (
            <a
              onClick={() => {
                history.push('/variant/DNM');
              }}
            >
              <strong style={{ color: '#252746' }}>DNM</strong>
            </a>
          ),
          key: '2-3',
        },{
          label: (
            <a
              onClick={() => {
                history.push('/variant/CNV');
              }}
            >
              <strong style={{ color: '#252746' }}>CNV</strong>
            </a>
          ),
          key: '2-4',
        },
        {
          label: (
            <a
              onClick={() => {
                history.push('/variant/SV');
              }}
            >
              <strong style={{ color: '#252746' }}>SV</strong>
            </a>
          ),
          key: '2-5',
        },
      ],
    },
    {
      label: (
        // <a
        //   onClick={() => {
        //     history.push('/gene_curation/all');
        //   }}
        // >
          <strong style={{ color: '#252746' }}>Gene</strong>
        // </a>
      ),
      key: '3',
      icon: <GeneIcon />,
      children: [
        {
          label: (
            <a
              onClick={() => {
                history.push('/gene_deg/all');
              }}
            >
              <strong style={{ color: '#252746' }}>Differential Analysis</strong>
            </a>
          ),
          key: '3-1',
        },
        {
          label: (
            <a
              onClick={() => {
                history.push('/gene_association/all');
              }}
            >
              <strong style={{ color: '#252746' }}>
                Association Analysis
              </strong>
            </a>
          ),
          key: '3-2',
        },
        {
          label: (
            <a
              onClick={() => {
                history.push('/gene_post/all');
              }}
            >
              <strong style={{ color: '#252746' }}>post-GWAS</strong>
            </a>
          ),
          key: '3-3',
        }
      ],
    },
    {
      label: (
        <a
          onClick={() => {
            history.push('/advance');
          }}
        >
          <strong style={{ color: '#252746' }}>Advance</strong>
        </a>
      ),
      key: '4',
      icon: <AdvanceIcon />,
    },
    {
      label: (
        <a
          onClick={() => {
            history.push('/toolkit');
          }}
        >
          <strong style={{ color: '#252746' }}>Toolkit</strong>
        </a>
      ),
      key: '5',
      icon: <ToolIcon />,
    },
    {
      label: (
        <a
          onClick={() => {
            history.push('/download');
          }}
        >
          <strong style={{ color: '#252746' }}>Resource</strong>
        </a>
      ),
      key: '6',
      icon: <DownloadOutlined />,
    },
    {
      label: (
        <a
          onClick={() => {
            history.push('/documentation');
          }}
        >
          <strong style={{ color: '#252746' }}>Documentation</strong>
        </a>
      ),
      key: '7',
      icon: <DocumentationIcon />,
    },
    {
      label: (
        <a
          onClick={() => {
            history.push('/contact');
          }}
        >
          <strong style={{ color: '#252746' }}>Contact</strong>
        </a>
      ),
      key: '8',
      icon: <ContactIcon />,
    },
  ];
  const onClick = (e) => {
    console.log('click ', e);
    setSelectkey(e.key);
  };

  return (
    <Row className={styles.container}>
      <Col md={24}>
        <NGDCHeader />
        <HeaderLab />
        <Layout>
          <Header className={styles.header}>
            <Row justify={'center'}>
              {/*<Col*/}
              {/*  xs={4}*/}
              {/*  sm={4}*/}
              {/*  md={4}*/}
              {/*  lg={4}*/}
              {/*  xl={4}*/}
              {/*  xxl={4}*/}
              {/*  style={{ textAlign: 'right' }}*/}
              {/*>*/}
              {/*  <Image*/}
              {/*    src={logo}*/}
              {/*    style={{ width: '20%', float: 'right',paddingTop:'7px' }}*/}
              {/*    preview={false}*/}
              {/*    onClick={() => {*/}
              {/*      history.push('/home');*/}
              {/*    }}*/}
              {/*  ></Image>*/}
              {/*</Col>*/}
              <Col
                xs={20}
                sm={20}
                md={20}
                lg={20}
                xl={20}
                xxl={16}
                style={{ justifyContent: 'center' }}
              >
                <Menu
                  theme="light "
                  mode="horizontal"
                  selectedKeys={[selectKey]}
                  style={{ lineHeight: '64px', backgroundColor: '#DDDDDD' }}
                  items={items}
                  onClick={onClick}
                ></Menu>
              </Col>
            </Row>
          </Header>
          <Row>
            <Col md={24} xl={24} lg={24}>
              <Content className="site-layout">
                <ConfigProvider locale={enUS}>
                  <div
                    className="site-layout-background"
                    style={{ padding: 24, minHeight: 380 }}
                  >
                    {props.children}
                  </div>
                </ConfigProvider>
              </Content>
            </Col>
          </Row>
          <BackTop />
          <Footer>
            <NGDCFooter />
          </Footer>
        </Layout>
      </Col>
    </Row>
  );
}
