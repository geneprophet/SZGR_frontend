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
} from '@/components/Icons';
import workflow from '@/assets/workflow.png';
import type { MenuProps } from 'antd';
import * as echarts from 'echarts';
import {
  Typography,
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
  message, Image
} from "antd";
const { Search } = Input;
import { SearchOutlined,DownOutlined,UserOutlined  } from '@ant-design/icons';
const { Text, Title, Link } = Typography;
import { URL_PREFIX,IMG_PREFIX } from '@/common/constants';
import Organizationkk from '@/components/Organization';
import React, { useEffect, useRef, useState } from "react";
import { getRemoteSVG } from "@/pages/service";
export default function IndexPage() {
  const [data, setData] = useState();
  const [nodes, setNodes] = useState();
  const chartRef: any = useRef(); //拿到DOM容器
  const [svg, setSvg] = useState(undefined);

  useEffect(()=>{
    const a = [
      ['GWAS Summary Statistics', 'MAGMA and deTS'],
      ['GWAS Summary Statistics', 'S-Predixcan'],
      ['MAGMA and deTS', 'Top 3 diseased related tissue and Whole Blood'],
      ['Top 3 diseased related tissue and Whole Blood', 'S-Predixcan'],
      ['S-Predixcan', 'Disease Gene Expression Signature'],
      ['Expanded CMap Signatures', 'Connectivity Methods'],
      ['GEO Signatures', 'Connectivity Methods'],
      ['Disease Gene Expression Signature', 'Connectivity Methods'],
      ['Connectivity Methods', 'Genetic Supported Drug Candidates'],
    ];
    setData(a);
    const b = [
      {
        id: 'GWAS Summary Statistics',
        title: '<strong>GWAS Summary Statistics</strong>',
        name: ' ',
        color: '#377D71',
        // layout: 'hanging',
        url: undefined,
      },
      {
        id: 'MAGMA and deTS',
        title: '<strong>MAGMA and deTS</strong>',
        name: ' ',
        color: '#D1D1D1',
        url: undefined,
        // column: 1,
        // offsetVertical: '-40%',
        // offsetHorizontal: '-60%',
        offset: '-100%',
      },
      {
        id: 'Top 3 diseased related tissue and Whole Blood',
        title: '<strong>Top 3 diseased related tissue and Whole Blood</strong>',
        name: ' ',
        url: undefined,
        color: '#D1D1D1',
        // column: 2,
        offset: '-100%'
      },
      {
        id: 'S-Predixcan',
        title: '<strong>S-Predixcan</strong>',
        name: ' ',
        url: undefined,
        color: '#D1D1D1',
        // column: 3,
        // layout: 'hanging',
        offset: '-50%'
      },
      {
        id: 'Disease Gene Expression Signature',
        title: '<strong>Disease Gene Expression Signature</strong>',
        name: ' ',
        url: window.location.pathname.replace('trait', 'magma'),
        color: '#F6E3C5',
        image: IMG_PREFIX + 'magma.png',
        offset: '-50%',
        // column: 5,
      },
      {
        id: 'Expanded CMap Signatures',
        title: '<strong>Expanded CMap Signatures</strong>',
        name: ' ',
        url: window.location.pathname.replace('trait', 'garfield'),
        color: '#F6E3C5',
        image: IMG_PREFIX + 'garfield.png',
        // layout: 'hanging',
        // column: 1,
      },
      {
        id: 'GEO Signatures',
        title: '<strong>GEO Signatures</strong>',
        name: ' ',
        url: window.location.pathname.replace('trait', 'ldsc'),
        color: '#F6E3C5',
        image: IMG_PREFIX + 'sldsc.png',
        // column: 1,
      },
      {
        id: 'Connectivity Methods',
        title: '<strong>Connectivity Methods</strong>',
        name: ' ',
        url: window.location.pathname.replace('trait', 'herit'),
        color: '#748DA6',
        image: IMG_PREFIX + 'herit.png',
        offset: '70%',
      },
      {
        id: 'Genetic Supported Drug Candidates',
        title: '<strong>Genetic Supported Drug Candidates</strong>',
        name: ' ',
        url: window.location.pathname.replace('trait', 'herit'),
        color: '#748DA6',
        image: IMG_PREFIX + 'heritenrich.png',
        offset: '70%',
      },
    ];
    setNodes(b);
    getRemoteSVG().then((res) => {
      // console.log(res);
      setSvg(res);
    });
  },[]);


  const [buttontext, setButtontext] = useState("Variant");
  const [placeholder, setPlaceholder] = useState("Please enter a keyword");
  const [url, setUrl] = useState("/explorevariant/");

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    // message.info('Click on menu item.' + e.key);
    if (e.key=="1"){
      setButtontext("Variant");
      setPlaceholder("Please enter a rsid");
      setUrl("/explorevariant/");
    }else if(e.key=="2"){
      setButtontext("Location");
      setPlaceholder("Please enter a Location");
      setUrl("/variant/");
    }else {
      setButtontext("Gene");
      setPlaceholder("Please enter a Gene");
      setUrl("/exploregene/");
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

  return (
    <div>
      <Row justify="center" style={{ background: '#BED7DC' }}>
        <Title level={2} className={styles.introduction}>
          SZGR 3.0: a one-stop shop of schizophrenia candidate genes
        </Title>
      </Row>
      <Divider />
      <Row justify={'center'}>
        <Col>
          <Dropdown menu={menuProps}>
            <Button type={"primary"} size={'large'}>
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
              <a href={URL_PREFIX + '/explorevariant/rs9890128'} target={'_blank'}>
                rs9890128,
              </a>
              <a
                href={URL_PREFIX + '/variant/chr7:620000-720000'}
                target={'_blank'}
              >
                chr7:620000-720000,
              </a>
              <a href={URL_PREFIX + '/exploregene/NRG1'} target={'_blank'}>
                NRG1
              </a>
            </Space>
          </strong>
        </Col>
      </Row>
      <Divider />
      <Row justify={'center'}>
        <Col xs={24} sm={24} md={22} lg={21} xl={17} xxl={17}>
          <Row justify={'center'}>
            {/*<Organizationkk data={data} nodes={nodes}/>*/}
            {/*<div*/}
            {/*  ref={chartRef}*/}
            {/*  className={styles.charts}*/}
            {/*  style={{ height: '800px', width: '100%' }}*/}
            {/*></div>*/}
            <Image src={workflow} preview={false} width={"80%"}/>
          </Row>
          <Divider />
          <Row>
            <Col xs={23} sm={23} md={23} lg={23} xl={23} xxl={23}>
              <div>
                <Title
                  level={2}
                  className={styles.introduction}
                  style={{ textAlign: 'left' }}
                >
                  Introduction of PharmGWAS:
                </Title>
                <Text
                  style={{
                    fontFamily: 'Trebuchet MS',
                    fontSize: '20px',
                    textAlign: 'justify',
                    display: 'inline-block',
                    width: '100%',
                  }}
                >
                  <p>
                    PharmGWAS is a comprehensive catalog for drug repurposing by leveraging a validated framework that links GWAS and drug perturbation data. The current release contains  <span style={{color:"red"}}>1,929</span> GWAS datasets, the <span style={{color:"red"}}>720,216</span> small molecule compound signatures of Expanded CMap LINCS Resource 2020, and <span style={{color:"red"}}>4,269</span> perturbation signatures from GEO. The analysis framework roughly includes three steps:
                  </p>
                  <p>
                    1)	To infer disease-relevant tissues based on GWAS summary statistics using
                    <a
                      href={
                        'https://ctg.cncr.nl/software/magma'
                      }
                      target={'_blank'}
                    >
                      {' '}MAGMA
                    </a> and
                    <a
                      href={'https://github.com/bsml320/deTS'}
                      target={'_blank'}
                    >
                      {' '}deTS
                    </a>
                    .
                  </p>
                  <p>
                    2)	To impute genetically regulated expression signatures (i.e., TWAS) in disease-relevant tissues. We used
                    <a
                      href={'https://github.com/hakyimlab/MetaXcan'}
                      target={'_blank'}
                    >
                      {' '}S-PrediXcan{' '}
                    </a>
                    for this purpose.
                  </p>
                  <p>
                    3)	To infer disease-drug pairs by integrative analysis of the imputed gene expression signatures with drug-induced gene expression signatures.
                  </p>
                  In total, PharmGWAS deposites <span style={{color:"red"}}>732,947</span> disease-drug pairs derived from
                  <a href={'https://clue.io'} target={'_blank'}>
                    {' '}Connectivity Map (CMap){' '}
                  </a>
                  signatures and <span style={{color:"red"}}>7,280</span> disease-drug pairs from
                  <a href={'https://www.ncbi.nlm.nih.gov/geo'} target={'_blank'}>
                    {' '}GEO{' '}
                  </a>
                  signatures. We believe PharmGWAS will shed light on drug discovery, drug combination and drug resistance, and drug side effects through the discovery power of GWAS.
                  More details can be found in the
                  <a href={URL_PREFIX + '/documentation'}>{' '}Documentation</a>
                  {' page.'}
                </Text>
              </div>
            </Col>
          </Row>
          <Divider />

        </Col>
        <Col xs={16} sm={16} md={16} lg={14} xl={7} xxl={7}>
          <Card
            title={<strong style={{ fontSize: '1.5em' }}>Statistics</strong>}
            bordered={true}
            hoverable={false}
          >
            <Card.Grid
              style={{ width: '50%', textAlign: 'center', height: '130px' }}
              hoverable={true}
              onClick={() => {
                window.open(URL_PREFIX + '/datasetoverview/all');
              }}
            >
              <Statistic
                title={
                  <strong style={{ color: '#363636', fontSize: '1.3em' }}>
                    GWAS Datasets
                  </strong>
                }
                value={1929}
                valueStyle={{ color: '#3f8600' }}
                prefix={<PeopleIcon />}
              />
            </Card.Grid>
            <Card.Grid
              style={{ width: '50%', textAlign: 'center', height: '130px' }}
              hoverable={true}
              onClick={() => {
                window.open(URL_PREFIX + '/cmapoverview/all');
              }}
            >
              <Statistic
                title={
                  <strong style={{ color: '#363636', fontSize: '1.3em' }}>
                    CMap Signatures
                  </strong>
                }
                value={720216}
                valueStyle={{ color: '#3f8600' }}
                prefix={<AdvanceIcon />}
              />
            </Card.Grid>
            <Card.Grid
              style={{ width: '50%', textAlign: 'center', height: '130px' }}
              hoverable={true}
              onClick={() => {
                window.open(URL_PREFIX + '/geooverview/all');
              }}
            >
              <Statistic
                title={
                  <strong style={{ color: '#363636', fontSize: '1.3em' }}>
                    GEO Signatures
                  </strong>
                }
                value={4269}
                valueStyle={{ color: '#3f8600' }}
                prefix={<GEOIcon />}
              />
            </Card.Grid>
            <Card.Grid
              style={{ width: '50%', textAlign: 'center', height: '130px' }}
              hoverable={true}
              onClick={() => {
                window.open(URL_PREFIX + '/documentation#methods');
              }}
            >
              <Statistic
                title={
                  <strong style={{ color: '#363636', fontSize: '1.3em' }}>
                    Connectivity Methods
                  </strong>
                }
                value={6}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ToolIcon />}
              />
            </Card.Grid>
            <Card.Grid
              style={{ width: '50%', textAlign: 'center', height: '130px' }}
              hoverable={true}
              onClick={() => {
                window.open(URL_PREFIX + '/allcmapresult');
              }}
            >
              <Statistic
                title={
                  <strong style={{ color: '#363636', fontSize: '1.3em' }}>
                    CMap Results
                  </strong>
                }
                value={732947}
                valueStyle={{ color: '#3f8600' }}
                prefix={<CompoundIcon />}
              />
            </Card.Grid>
            <Card.Grid
              style={{ width: '50%', textAlign: 'center', height: '130px' }}
              hoverable={true}
              onClick={() => {
                window.open(URL_PREFIX + '/allgeoresult');
              }}
            >
              <Statistic
                title={
                  <strong style={{ color: '#363636', fontSize: '1.3em' }}>
                    GEO Results
                  </strong>
                }
                value={7280}
                valueStyle={{ color: '#3f8600' }}
                prefix={<TreatmentIcon />}
              />
            </Card.Grid>
          </Card>
          <Divider />
          <Card
            title={<strong style={{ fontSize: '1.5em' }}>Recent Events</strong>}
            bordered={true}
          >
            <Timeline style={{ width: '100%' }}>
              <Timeline.Item style={{ fontSize: '1.2em' }} color={"green"}>
                PharmGWAS Version 1.0 is released on 2022-06-29
              </Timeline.Item>
              <Timeline.Item style={{ fontSize: '1.2em' }}>
                Bugs fixed on 2022-06-28
              </Timeline.Item>
              <Timeline.Item style={{ fontSize: '1.2em' }}>
                Network problems being solved 2022-06-22
              </Timeline.Item>
              <Timeline.Item style={{ fontSize: '1.2em' }}>
                All analyses were finished on 2022-6-21
              </Timeline.Item>
              <Timeline.Item style={{ fontSize: '1.2em' }}>
                All GWAS datasets were collected on 2022-03-15
              </Timeline.Item>
              <Timeline.Item style={{ fontSize: '1.2em' }}>
                The project PharmGWAS was created on 2022-03-07
              </Timeline.Item>
            </Timeline>
          </Card>
          <Divider />
          <Card
            title={
              <strong style={{ fontSize: '1.5em' }}>External Links</strong>
            }
            bordered={true}
            hoverable={false}
          >
            <p>
              <a href={'https://www.ebi.ac.uk/gwas/'} target={'_blank'}>
                {' '}
                <LinkOutlined />
                &nbsp;GWAS Catalog{' '}
              </a>
            </p>
            <p>
              <a href={'http://www.nealelab.is/uk-biobank'} target={'_blank'}>
                {' '}
                <LinkOutlined />
                &nbsp;UK BioBank{' '}
              </a>
            </p>
            <p>
              <a
                href={'https://clue.io/'}
                target={'_blank'}
              >
                {' '}
                <LinkOutlined />
                &nbsp;ConnectivityMap{' '}
              </a>
            </p>
            <p>
              <a href={'https://maayanlab.cloud/sigcom-lincs/'} target={'_blank'}>
                {' '}
                <LinkOutlined />
                &nbsp;Signature Commons{' '}
              </a>
            </p>
            <p>
              <a
                href={'https://www.ncbi.nlm.nih.gov/geo/'}
                target={'_blank'}
              >
                <LinkOutlined />
                &nbsp;GEO
              </a>
            </p>
            {/*<p>*/}
            {/*  <a href={'https://lph-big.github.io/'} target={'_blank'}>*/}
            {/*    <LinkOutlined />*/}
            {/*    &nbsp;Laboratory for Precision Health{' '}*/}
            {/*  </a>*/}
            {/*</p>*/}
            {/*<p>*/}
            {/*  <a href={'https://ngdc.cncb.ac.cn/'} target={'_blank'}>*/}
            {/*    <LinkOutlined />*/}
            {/*    &nbsp;National Genomics Data Center*/}
            {/*  </a>*/}
            {/*</p>*/}
          </Card>
          <Divider />
          <Card
            title={
              <strong style={{ fontSize: '1.5em' }}>Citation</strong>
            }
            bordered={true}
            hoverable={false}
          >
            <Text
              style={{
                fontFamily: 'Trebuchet MS',
                fontSize: '20px',
                textAlign: 'left',
                display: 'inline-block',
                width: '100%',
              }}
            >
              {
                'PharmGWAS: a GWAS-based knowledgebase for drug repurposing. Nucleic Acids Research,2023;gkad832. doi: '
              }
              <a
                href={'https://doi.org/10.1093/nar/gkad832'}
                target={'_blank'}
              >
                10.1093/nar/gkad832
              </a>
            </Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
