import styles from './index.less';
import { LinkOutlined } from '@ant-design/icons';
import {
  PeopleIcon,
  DatasetIcon,
  VSIcon,
  DrugIcon,
  ToolIcon,
  AdvanceIcon,
  TreatmentIcon,
  CompoundIcon,
  GEOIcon,
  Icon1,
  Icon2,
  Icon3,
  Icon4,
  Icon5,
  Icon6,
  Icon7,
  Icon8,
} from '@/components/Icons';
import workflow from '@/assets/home.png';
import { MenuProps, List, Typography } from 'antd';
const { Item } = List;
import * as echarts from 'echarts';
import {
  Row,
  Col,
  Card,
  Button,
  Statistic,
  Divider,
  Timeline,
  Input,
  Dropdown,
  Space,
  message,
  Image,
} from 'antd';
const { Search } = Input;
import { SearchOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';
const { Text, Title, Link } = Typography;
import { URL_PREFIX, IMG_PREFIX } from '@/common/constants';
import Organizationkk from '@/components/Organization';
import React, { useEffect, useRef, useState } from 'react';
import { getRemoteSVG } from '@/pages/service';
export default function IndexPage() {
  const [buttontext, setButtontext] = useState('Variant');
  const [placeholder, setPlaceholder] = useState('Please enter a keyword');
  const [url, setUrl] = useState('/explorevariant/');

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    // message.info('Click on menu item.' + e.key);
    if (e.key == '1') {
      setButtontext('Variant');
      setPlaceholder('Please enter a rsid');
      setUrl('/explorevariant/');
    } else if (e.key == '2') {
      setButtontext('Location');
      setPlaceholder('Please enter a Location');
      setUrl('/variant/');
    } else {
      setButtontext('Gene');
      setPlaceholder('Please enter a Gene');
      setUrl('/exploregene/');
    }
  };

  const items: MenuProps['items'] = [
    {
      label: 'Rsid',
      key: '1',
    },
    {
      label: 'Location',
      key: '2',
    },
    {
      label: 'Gene',
      key: '3',
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const data = [
    'June 28, 2024: We released SZGR 3.0.',
    'June 27, 2016: SZGR was renamed to SZGR 2.0.',
    'June 2016, SZGR has passed the screen and is officially online through The University of Texas Health Science Center at Houston.',
    'March 2016, SZGR in our Vanderbilt server was temporally shutdown due to our lab move to the University of Texas.',
    'May 2009: SZGR was first released at Virginia Institute for Psychiatric and Behavioral Genetics (VIPBG).',
  ];

  return (
    <div>
      <Row justify="center" style={{ background: '#BED7DC' }}>
        <Title level={2} className={styles.introduction}>
          SZGR: <Text underline={true}>S</Text>chi
          <Text underline={true}>Z</Text>ophrenia{' '}
          <Text underline={true}>G</Text>ene <Text underline={true}>R</Text>
          esource (Version 3.0)
        </Title>
      </Row>
      <Divider />
      <Row justify={'center'}>
        <Col>
          <Dropdown menu={menuProps}>
            <Button type={'primary'} size={'large'}>
              <Space>
                {buttontext}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </Col>
        <Col xs={18} sm={16} md={16} lg={12} xl={12} xxl={12}>
          <Search
            placeholder={placeholder}
            allowClear
            enterButton={
              <strong>
                <SearchOutlined /> Search
              </strong>
            }
            size="large"
            onSearch={(value) => {
              console.log(value);
              if (value) {
                window.open(URL_PREFIX + url + value.trim(), '_blank'); //在新页面打开
              } else {
                message.warn('please input the keyword!!');
              }
            }}
          />
          <strong style={{ fontSize: '1.2em' }}>
            e.g.{' '}
            <Space>
              <a
                href={URL_PREFIX + '/explorevariant/rs594591'}
                target={'_blank'}
              >
                rs594591,
              </a>
              <a
                href={URL_PREFIX + '/variant/chr6:29760111-29760510'}
                target={'_blank'}
              >
                chr6:29760111-29760510,
              </a>
              <a href={URL_PREFIX + '/exploregene/SOX2-OT'} target={'_blank'}>
                SOX2-OT,
              </a>
              <a href={URL_PREFIX + '/exploregene/CACNA1C'} target={'_blank'}>
                CACNA1C
              </a>
            </Space>
          </strong>
        </Col>
      </Row>
      <Divider />
      <Row justify={'center'}>
        <Col xs={24} sm={24} md={22} lg={21} xl={14} xxl={14}>
          <Row justify={'space-around'}>
            <Space>
              <Title
                level={2}
                style={{
                  width: '160px',
                  height: '50px',
                  border: '1px solid',
                  textAlign: 'center',
                  borderRadius: '20px',
                  backgroundColor: '#D3EADE',
                }}
              >
                Curation
              </Title>
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: 'bolder',
                  color: '#BED7DC',
                }}
              >
                →
              </span>
              <Title
                level={2}
                style={{
                  width: '160px',
                  height: '50px',
                  border: '1px solid',
                  textAlign: 'center',
                  borderRadius: '20px',
                  backgroundColor: '#D1ECF8',
                }}
              >
                Annotation
              </Title>
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: 'bolder',
                  color: '#BED7DC',
                }}
              >
                →
              </span>
              <Title
                level={2}
                style={{
                  width: '160px',
                  height: '50px',
                  border: '1px solid',
                  textAlign: 'center',
                  borderRadius: '20px',
                  backgroundColor: '#C7E1F5',
                }}
              >
                Validation
              </Title>
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: 'bolder',
                  color: '#BED7DC',
                }}
              >
                →
              </span>
              <Title
                level={2}
                style={{
                  width: '160px',
                  height: '50px',
                  border: '1px solid',
                  textAlign: 'center',
                  borderRadius: '20px',
                  backgroundColor: '#F2DCEB',
                }}
              >
                Analysis
              </Title>
            </Space>
          </Row>
          <Card
            // title={<strong style={{ fontSize: '1.5em' }}>Statistics</strong>}
            bordered={true}
            hoverable={false}
          >
            <Card.Grid
              style={{ width: '25%', textAlign: 'center', height: '130px' }}
              hoverable={true}
            >
              <Statistic
                title={
                  <strong style={{ color: '#363636', fontSize: '1.3em' }}>
                    Variants
                  </strong>
                }
                value={21969}
                valueStyle={{ color: '#3f8600' }}
                prefix={<Icon1 />}
              />
            </Card.Grid>
            <Card.Grid
              style={{ width: '25%', textAlign: 'center', height: '130px' }}
              hoverable={true}
            >
              <Statistic
                title={
                  <strong style={{ color: '#363636', fontSize: '1.3em' }}>
                    Genes
                  </strong>
                }
                value={21438}
                valueStyle={{ color: '#3f8600' }}
                prefix={<Icon2 />}
              />
            </Card.Grid>
            <Card.Grid
              style={{ width: '25%', textAlign: 'center', height: '130px' }}
              hoverable={true}
            >
              <Statistic
                title={
                  <strong style={{ color: '#363636', fontSize: '1.3em' }}>
                    Publications
                  </strong>
                }
                value={654}
                valueStyle={{ color: '#3f8600' }}
                prefix={<Icon3 />}
              />
            </Card.Grid>
            <Card.Grid
              style={{ width: '25%', textAlign: 'center', height: '130px' }}
              hoverable={true}
            >
              <Statistic
                title={
                  <strong style={{ color: '#363636', fontSize: '1.3em' }}>
                    Omics
                  </strong>
                }
                value={5}
                valueStyle={{ color: '#3f8600' }}
                prefix={<Icon4 />}
              />
            </Card.Grid>
            <Card.Grid
              style={{ width: '25%', textAlign: 'center', height: '130px' }}
              hoverable={true}
            >
              <Statistic
                title={
                  <strong style={{ color: '#363636', fontSize: '1.3em' }}>
                    Annotations
                  </strong>
                }
                value={14}
                valueStyle={{ color: '#3f8600' }}
                prefix={<Icon5 />}
              />
            </Card.Grid>
            <Card.Grid
              style={{ width: '25%', textAlign: 'center', height: '130px' }}
              hoverable={true}
            >
              <Statistic
                title={
                  <strong style={{ color: '#363636', fontSize: '1.3em' }}>
                    Brain Region
                  </strong>
                }
                value={5}
                valueStyle={{ color: '#3f8600' }}
                prefix={<Icon6 />}
              />
            </Card.Grid>
            <Card.Grid
              style={{ width: '25%', textAlign: 'center', height: '130px' }}
              hoverable={true}
            >
              <Statistic
                title={
                  <strong style={{ color: '#363636', fontSize: '1.3em' }}>
                    Age Stages
                  </strong>
                }
                value={6}
                valueStyle={{ color: '#3f8600' }}
                prefix={<Icon7 />}
              />
            </Card.Grid>
            <Card.Grid
              style={{ width: '25%', textAlign: 'center', height: '130px' }}
              hoverable={true}
            >
              <Statistic
                title={
                  <strong style={{ color: '#363636', fontSize: '1.3em' }}>
                    Cell Types
                  </strong>
                }
                value={163}
                valueStyle={{ color: '#3f8600' }}
                prefix={<Icon8 />}
              />
            </Card.Grid>
          </Card>
          <Row justify={'center'}>
            <Col>
              <List
                size="small"
                header={<div style={{ textAlign: 'center' }}>Release Note</div>}
                bordered
                dataSource={data}
                renderItem={(item) => (
                  <Item>
                    <Text>{item}</Text>
                  </Item>
                )}
              />
            </Col>
            <Divider />
          </Row>
        </Col>
        <Col xs={16} sm={16} md={16} lg={14} xl={10} xxl={10}>
          <Row justify={'center'}>
            <Image src={workflow} preview={false} width={'80%'} />
          </Row>
        </Col>
      </Row>
    </div>
  );
}
