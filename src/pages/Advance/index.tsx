import React, { useEffect, useState } from "react";
import styles from './index.less';
import { getRemoteVariant, getRemoteVariantLike, getRemoteVariantlocus } from "@/pages/VariantOverview/service";
import { ApartmentOutlined, SearchOutlined } from '@ant-design/icons';
import { Parser } from 'json2csv';
// @ts-ignore
import { URL_PREFIX,uniqueArray,IMG_PREFIX } from '@/common/constants';
import {
  Breadcrumb,
  Col,
  Divider,
  Table,
  Row,
  Select,
  Space,
  Typography,
  Image,
} from 'antd';
const {Title} = Typography;
import { ProColumns, ProTable } from "@ant-design/pro-table";
import {
  AnalysisIcon
} from "../../components/Icons/index";
import { pop } from "echarts/types/src/component/dataZoom/history";
import {
  getRemoteGeneadvance,
  getRemoteGeneadvancelike,
  getRemoteVariantadvance,
  getRemoteVariantadvanceLike
} from "@/pages/Advance/service";
import { Tabs } from 'antd';
import { getRemoteGenedrug } from "@/pages/ExploreGene/service";


export default function Page(props: any) {
  const [variants, setVariants] = useState(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState(0);
  const [pagesize, setPagesize] = useState(10);
  const [pageindex, setPageindex] = useState(1);

  const [genes, setGenes] = useState(undefined);
  const [loading2, setLoading2] = useState<boolean>(true);
  const [total2, setTotal2] = useState(0);
  const [pagesize2, setPagesize2] = useState(10);
  const [pageindex2, setPageindex2] = useState(1);

  const [drugs, setDrugs] = useState(undefined);
  const [loading3, setLoading3] = useState<boolean>(true);
  const [total3, setTotal3] = useState(0);
  const [pagesize3, setPagesize3] = useState(10);
  const [pageindex3, setPageindex3] = useState(1);


  interface SearchKeywords {
    vid: string | undefined;
    gene: string | undefined;
    sort_field: string | undefined;
    sort_direction: string | undefined;
  }

  const [keywords, setKeywords] = useState<SearchKeywords>({});


  useEffect(() => {
    getRemoteVariantadvance({
          pageSize: pagesize,
          pageIndex: pageindex,
          vid: undefined,
          sort_field:undefined,
          sort_direction:undefined
        }).then((res) => {
          setLoading(false);
          setVariants(res.data);
          setTotal(res.meta.total);
        });
  }, []);
  useEffect(() => {
    getRemoteGeneadvance({
      pageSize: pagesize2,
      pageIndex: pageindex2,
      gene: undefined,
      sort_field:undefined,
      sort_direction:undefined
    }).then((res) => {
      setLoading2(false);
      setGenes(res.data);
      setTotal2(res.meta.total);
    });
  }, []);
  useEffect(() => {
    getRemoteGenedrug({
      pageSize: pagesize3,
      pageIndex: pageindex3,
      gene: undefined,
      sort_field: undefined,
      sort_direction: undefined,
    }).then((res) => {
      setLoading3(false);
      setDrugs(res.data);
      setTotal3(res.meta.total);
    });
  }, []);

  const [vidlist, setVidlist] = useState([]);
  const [genelist, setGenelist] = useState([]);

  const [selectitems, setSelectitems] = useState([]);
  const [selectitemsrowkey, setSelectitemsrowkey] = useState([]);
  const columns = [
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Variant ID</strong>,
      key: 'vid',
      dataIndex: 'vid',
      ellipsis: true,
      width: 150,
      search: true,
      sorter: true,
      renderFormItem: () => {
        const options = vidlist.map((item) => (
          <Select.Option key={item} value={item} type={item}>
            {item}
          </Select.Option>
        ));
        return (
          <Select
            key={'vidSelect'}
            showSearch={true}
            placeholder={'input and select a rsid'}
            filterOption={false}
            onFocus={async () => {
              const remoteKeywords = await getRemoteVariantadvance({
                pageSize: 100,
                pageIndex: 1,
                vid: undefined,
                sort_field:undefined,
                sort_direction:undefined,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.vid);
                  }
                });
                setVidlist(nameList);
              }
            }}
            onSearch={async (value: string) => {
              const remoteKeywords = await getRemoteVariantadvanceLike({
                pageSize: 100,
                pageIndex: 1,
                vid: value,
                sort_field:undefined,
                sort_direction:undefined
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.vid);
                  }
                });
                setVidlist(nameList);
              }
            }}
            onChange={(value) => {
              setKeywords({ ...keywords, vid: value });
              // console.log(value)
            }}
          >
            {options}
          </Select>
        );
      },
      render: (text: string, record) => (
        <span>
          <a
            className={styles.link}
            href={URL_PREFIX + '/explorevariant/' + record.vid}
            target={'_blank'}
          >
            <Space>
              {record.vid}
            </Space>
          </a>
        </span>
      ),
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Chr</strong>,
      key: 'chr',
      dataIndex: 'chr',
      ellipsis: true,
      sorter: true,
      search: false,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Start</strong>,
      key: 'start',
      dataIndex: 'start',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>End</strong>,
      key: 'end',
      dataIndex: 'end',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Gene</strong>,
      key: 'gene',
      dataIndex: 'gene',
      ellipsis: true,
      search: false,
      sorter: true,
      width:150,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>caQTL</strong>,
      key: 'caqtl',
      dataIndex: 'caqtl',
      ellipsis: true,
      search: false,
      sorter: true,
      width:150,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>eQTL</strong>,
      key: 'eqtl',
      dataIndex: 'eqtl',
      ellipsis: true,
      search: false,
      sorter: true,
      width:150,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>haQTL</strong>,
      key: 'haqtl',
      dataIndex: 'haqtl',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>meQTL</strong>,
      key: 'meqtl',
      dataIndex: 'meqtl',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>pQTL</strong>,
      key: 'pqtl',
      dataIndex: 'pqtl',
      ellipsis: true,
      search: false,
      sorter: true,
      width:150,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>mpra</strong>,
      key: 'mpra',
      dataIndex: 'mpra',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>CRISPR</strong>,
      key: 'crispr',
      dataIndex: 'crispr',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Score</strong>,
      key: 'score',
      dataIndex: 'score',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    }
  ];
  const columns2 = [
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Gene</strong>,
      key: 'gene',
      dataIndex: 'gene',
      ellipsis: true,
      width: 150,
      search: true,
      sorter: true,
      renderFormItem: () => {
        const options = genelist.map((item) => (
          <Select.Option key={item} value={item} type={item}>
            {item}
          </Select.Option>
        ));
        return (
          <Select
            key={'vidSelect'}
            showSearch={true}
            placeholder={'input and select a gene'}
            filterOption={false}
            onFocus={async () => {
              const remoteKeywords = await getRemoteGeneadvance({
                pageSize: 100,
                pageIndex: 1,
                gene: undefined,
                sort_field:undefined,
                sort_direction:undefined,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.gene);
                  }
                });
                setGenelist(nameList);
              }
            }}
            onSearch={async (value: string) => {
              const remoteKeywords = await getRemoteGeneadvancelike({
                pageSize: 100,
                pageIndex: 1,
                gene: value,
                sort_field:undefined,
                sort_direction:undefined
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.gene);
                  }
                });
                setGenelist(nameList);
              }
            }}
            onChange={(value) => {
              setKeywords({ ...keywords, gene: value });
              // console.log(value)
            }}
          >
            {options}
          </Select>
        );
      },
      render: (text: string, record) => (
        <span>
          <a
            className={styles.link}
            href={URL_PREFIX + '/exploregene/' + record.gene}
            target={'_blank'}
          >
            <Space>
              {record.gene}
            </Space>
          </a>
        </span>
      ),
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>DEG</strong>,
      key: 'deg',
      dataIndex: 'deg',
      ellipsis: true,
      sorter: true,
      search: false,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>TWAS</strong>,
      key: 'twas',
      dataIndex: 'twas',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>EWAS</strong>,
      key: 'ewas',
      dataIndex: 'ewas',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>eQTL</strong>,
      key: 'eqtl',
      dataIndex: 'eqtl',
      ellipsis: true,
      search: false,
      sorter: true,
      width:150,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>meQTL</strong>,
      key: 'meqtl',
      dataIndex: 'meqtl',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>CRISPR</strong>,
      key: 'crispr',
      dataIndex: 'crispr',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>CRISPR Hit</strong>,
      key: 'crispr_hit',
      dataIndex: 'crispr_hit',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>CRISPR Hit Target</strong>,
      key: 'crispr_hit_targets',
      dataIndex: 'crispr_hit_targets',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Other Expriments</strong>,
      key: 'other_expriments',
      dataIndex: 'other_expriments',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Score</strong>,
      key: 'score',
      dataIndex: 'score',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    }
  ];
  const columns3 = [
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Gene</strong>,
      key: 'gene',
      dataIndex: 'gene',
      ellipsis: true,
      width: 150,
      search: true,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Ensemble ID</strong>,
      key: 'ensemble',
      dataIndex: 'ensemble',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>ChEMBL ID</strong>,
      key: 'chembl_id',
      dataIndex: 'chembl_id',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Drug Type</strong>,
      key: 'drug_type',
      dataIndex: 'drug_type',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Drug Name</strong>,
      key: 'drug_name',
      dataIndex: 'drug_name',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: (
        <strong style={{ fontFamily: 'sans-serif' }}>Maximum Clinical Trial Phase</strong>
      ),
      key: 'clinical_trail',
      dataIndex: 'clinical_trail',
      ellipsis: true,
      search: false,
      width: 300,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>EFO ID</strong>,
      key: 'efo_id',
      dataIndex: 'efo_id',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>EFO TERM</strong>,
      key: 'efo_term',
      dataIndex: 'efo_term',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Max Phase for ind</strong>,
      key: 'phase_ind',
      dataIndex: 'phase_ind',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Mesh Heading</strong>,
      key: 'mesh',
      dataIndex: 'mesh',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Warning Class</strong>,
      key: 'warning',
      dataIndex: 'warning',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Action Type</strong>,
      key: 'action',
      dataIndex: 'action',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: (
        <strong style={{ fontFamily: 'sans-serif' }}>Mechanism Comment</strong>
      ),
      key: 'mechanism_comment',
      dataIndex: 'mechanism_comment',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: (
        <strong style={{ fontFamily: 'sans-serif' }}>Mechanism of Action</strong>
      ),
      key: 'mechanism_action',
      dataIndex: 'mechanism_action',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: (
        <strong style={{ fontFamily: 'sans-serif' }}>Target ChEMBL ID</strong>
      ),
      key: 'target_chembl_id',
      dataIndex: 'target_chembl_id',
      ellipsis: true,
      search: false,
      sorter: true,
    },
  ];
  const [key, setKey] = useState('cerebellum');

  const onChange = (key: string) => {
    setKey(key);
    console.log(key);
  };
  return (
    <div>
      <Row>
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href={URL_PREFIX + '/home'}>
                <strong style={{ fontFamily: 'sans-serif' }}>Home</strong>
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">
                <strong style={{ fontFamily: 'sans-serif' }}>
                  Advance
                </strong>
              </a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Title level={3}>Variants Score</Title>
      </Row>
      <Row justify={'center'}>
        <Col md={24}>
          <ProTable
            columns={columns}
            bordered={true}
            options={false}
            dataSource={variants}
            loading={loading}
            scroll={{ x: 1500 }}
            rowKey={(record: any) => {
              return record.id.toString() + 'table';
            }}
            search={{
              defaultCollapsed: false,
              labelWidth: 130,
              searchText: 'Search',
              resetText: 'Reset',
              collapseRender: false,
              collapsed: false,
            }}
            pagination={{
              pageSize: pagesize,
              total: total,
              pageSizeOptions: [10, 20, 50, 100],
              showQuickJumper: true,
              showSizeChanger: true,
            }}
            onSubmit={() => {
              setLoading(true);
              getRemoteVariantadvance({
                pageSize: pagesize,
                pageIndex: 1,
                vid:keywords.vid,
                sort_field:undefined,
                sort_direction:undefined
              }).then((res) => {
                setVariants(res.data);
                setLoading(false);
                setTotal(res.meta.total);
              });
            }}
            onReset={() => {
              setLoading(true);
              getRemoteVariantadvance({
                pageSize: 10,
                pageIndex: 1,
                vid:undefined,
                sort_field:undefined,
                sort_direction:undefined
              }).then((res) => {
                setVariants(res.data);
                setLoading(false);
                setTotal(res.meta.total);
                setPagesize(res.meta.pageSize);
                setKeywords({});
              });
            }}
            onChange={(pagination, filters, sorter, extra) => {
              // console.log(pagination);
              // console.log(sorter);
              setPageindex(pagination.current);
              setPagesize(pagination.pageSize);
              setKeywords({ ...keywords, sort_field: sorter.field });
              setKeywords({ ...keywords, sort_direction: sorter.order });
              setLoading(true);
                getRemoteVariantadvance({
                  pageSize: pagination.pageSize,
                  pageIndex: pagination.current,
                  vid:keywords.vid,
                  sort_field: sorter.field,
                  sort_direction: sorter.order,
                }).then((res) => {
                  setVariants(res.data);
                  setLoading(false);
                  setTotal(res.meta.total);
                });
            }}
          />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Title level={3}>Gene Score</Title>
      </Row>
      <Row justify={'center'}>
        <Col md={24}>
          <ProTable
            columns={columns2}
            bordered={true}
            options={false}
            dataSource={genes}
            loading={loading2}
            scroll={{ x: 1500 }}
            rowKey={(record: any) => {
              return record.id.toString() + 'table2';
            }}
            search={{
              defaultCollapsed: false,
              labelWidth: 130,
              searchText: 'Search',
              resetText: 'Reset',
              collapseRender: false,
              collapsed: false,
            }}
            pagination={{
              pageSize: pagesize2,
              total: total2,
              pageSizeOptions: [10, 20, 50, 100],
              showQuickJumper: true,
              showSizeChanger: true,
            }}
            onSubmit={() => {
              setLoading2(true);
              getRemoteGeneadvance({
                pageSize: pagesize,
                pageIndex: 1,
                gene:keywords.gene,
                sort_field:undefined,
                sort_direction:undefined
              }).then((res) => {
                setGenes(res.data);
                setLoading2(false);
                setTotal2(res.meta.total);
              });
            }}
            onReset={() => {
              setLoading2(true);
              getRemoteGeneadvance({
                pageSize: 10,
                pageIndex: 1,
                gene:undefined,
                sort_field:undefined,
                sort_direction:undefined
              }).then((res) => {
                setGenes(res.data);
                setLoading2(false);
                setTotal2(res.meta.total);
                setPagesize2(res.meta.pageSize);
                setKeywords({});
              });
            }}
            onChange={(pagination, filters, sorter, extra) => {
              // console.log(pagination);
              // console.log(sorter);
              setPageindex(pagination.current);
              setPagesize(pagination.pageSize);
              setKeywords({ ...keywords, sort_field: sorter.field });
              setKeywords({ ...keywords, sort_direction: sorter.order });
              setLoading2(true);
              getRemoteGeneadvance({
                pageSize: pagination.pageSize,
                pageIndex: pagination.current,
                gene:keywords.gene,
                sort_field: sorter.field,
                sort_direction: sorter.order,
              }).then((res) => {
                setGenes(res.data);
                setLoading2(false);
                setTotal2(res.meta.total);
              });
            }}
          />
        </Col>
      </Row>
      <Divider/>
      <Row>
        <Title level={3}>Single Cell</Title>
      </Row>
      <Row>
        <Tabs
          defaultActiveKey="1"
          onChange={onChange}
          items={[
            {
              label: `Cerebellum`,
              key: 'cerebellum',
              children:
                <Row justify={'space-around'}>
                  <Col md={12}>
                    <Image width={'90%'} src={IMG_PREFIX + 'advance/' + key +'/draw_graph_fa_celltypes.png' } />
                  </Col>
                  <Col md={12}>
                    <Image width={'90%'} src={IMG_PREFIX + 'advance/' + key +'/draw_graph_fa_age.png' } />
                  </Col>
                  <Col md={12}>
                    <Image width={'90%'} src={IMG_PREFIX + 'advance/' + key +'/stacked_violin__celltype_top5_heg.png' } />
                  </Col>
                  <Col md={12}>
                    <Image width={'90%'} src={IMG_PREFIX + 'advance/' + key +'/stacked_violin__age_top5_heg.png' } />
                  </Col>
                </Row>,
            },
            {
              label: `Fetal Forebrain`,
              key: 'fetal_forebrain',
              children:
                <Row justify={'space-around'}>
                <Col md={12}>
                  <Image width={'90%'} src={IMG_PREFIX + 'advance/' + key +'/draw_graph_fa_celltypes.png' } />
                </Col>
                <Col md={12}>
                  <Image width={'90%'} src={IMG_PREFIX + 'advance/' + key +'/draw_graph_fa_age.png' } />
                </Col>
                <Col md={12}>
                  <Image width={'90%'} src={IMG_PREFIX + 'advance/' + key +'/stacked_violin__celltype_top5_heg.png' } />
                </Col>
                <Col md={12}>
                  <Image width={'90%'} src={IMG_PREFIX + 'advance/' + key +'/stacked_violin__age_top5_heg.png' } />
                </Col>
              </Row>,
            },
            {
              label: `Ganglionic Eminences and Cortex`,
              key: 'ganglionic_eminences_and_cortex',
              children:
                <Row justify={'space-around'}>
                  <Col md={12}>
                    <Image width={'90%'} src={IMG_PREFIX + 'advance/' + key +'/draw_graph_fa_celltypes.png' } />
                  </Col>
                  <Col md={12}>
                    <Image width={'90%'} src={IMG_PREFIX + 'advance/' + key +'/draw_graph_fa_age.png' } />
                  </Col>
                  <Col md={12}>
                    <Image width={'90%'} src={IMG_PREFIX + 'advance/' + key +'/stacked_violin__celltype_top5_heg.png' } />
                  </Col>
                  <Col md={12}>
                    <Image width={'90%'} src={IMG_PREFIX + 'advance/' + key +'/stacked_violin__age_top5_heg.png' } />
                  </Col>
                </Row>,
            },
            {
              label: `Hippocampal-Entorhinal System`,
              key: 'hippocampal-entorhinal_system',
              children:
                <Row justify={'space-around'}>
                  <Col md={12}>
                    <Image width={'90%'} src={IMG_PREFIX + 'advance/' + key +'/draw_graph_fa_celltypes.png' } />
                  </Col>
                  <Col md={12}>
                    <Image width={'90%'} src={IMG_PREFIX + 'advance/' + key +'/draw_graph_fa_age.png' } />
                  </Col>
                  <Col md={12}>
                    <Image width={'90%'} src={IMG_PREFIX + 'advance/' + key +'/stacked_violin__celltype_top5_heg.png' } />
                  </Col>
                  <Col md={12}>
                    <Image width={'90%'} src={IMG_PREFIX + 'advance/' + key +'/stacked_violin__age_top5_heg.png' } />
                  </Col>
                </Row>,
            },
            {
              label: `Hippocampus`,
              key: 'hippocampus',
              children:
                <Row justify={'space-around'}>
                  <Col md={12}>
                    <Image width={'90%'} src={IMG_PREFIX + 'advance/' + key +'/draw_graph_fa_celltypes.png' } />
                  </Col>
                  <Col md={12}>
                    <Image width={'90%'} src={IMG_PREFIX + 'advance/' + key +'/draw_graph_fa_age.png' } />
                  </Col>
                  <Col md={12}>
                    <Image width={'90%'} src={IMG_PREFIX + 'advance/' + key +'/stacked_violin__celltype_top5_heg.png' } />
                  </Col>
                  <Col md={12}>
                    <Image width={'90%'} src={IMG_PREFIX + 'advance/' + key +'/stacked_violin__age_top5_heg.png' } />
                  </Col>
                </Row>,
            },
            {
              label: `Neocortex`,
              key: 'neocortex',
              children:
                <Row justify={'space-around'}>
                  <Col md={12}>
                    <Image width={'90%'} src={IMG_PREFIX + 'advance/' + key +'/draw_graph_fa_celltypes.png' } />
                  </Col>
                  <Col md={12}>
                    <Image width={'90%'} src={IMG_PREFIX + 'advance/' + key +'/draw_graph_fa_age.png' } />
                  </Col>
                  <Col md={12}>
                    <Image width={'90%'} src={IMG_PREFIX + 'advance/' + key +'/stacked_violin__celltype_top5_heg.png' } />
                  </Col>
                  <Col md={12}>
                    <Image width={'90%'} src={IMG_PREFIX + 'advance/' + key +'/stacked_violin__age_top5_heg.png' } />
                  </Col>
                </Row>,
            },
            {
              label: `Prefrontal Cortex in Schizophrenia Subjects`,
              key: 'prefrontal_cortex_in_schizophrenia_subjects',
              children:
                <Row justify={'space-around'}>
                  <Col md={12}>
                    <Image width={'90%'} src={IMG_PREFIX + 'advance/' + key +'/draw_graph_fa_celltypes.png' } />
                  </Col>
                  <Col md={12}>
                    <Image width={'90%'} src={IMG_PREFIX + 'advance/' + key +'/draw_graph_fa_age.png' } />
                  </Col>
                  <Col md={12}>
                    <Image width={'90%'} src={IMG_PREFIX + 'advance/' + key +'/stacked_violin__celltype_top5_heg.png' } />
                  </Col>
                  <Col md={12}>
                    <Image width={'90%'} src={IMG_PREFIX + 'advance/' + key +'/stacked_violin__age_top5_heg.png' } />
                  </Col>
                </Row>,
            },
          ]}
        />
      </Row>
      <Divider/>
      <Row>
        <Title level={3}>Drug Annotation</Title>
      </Row>
      <Row justify={'center'}>
        <Col md={24}>
          <ProTable
            columns={columns3}
            bordered={true}
            options={false}
            dataSource={drugs}
            loading={loading3}
            scroll={{ x: 2700 }}
            rowKey={(record: any) => {
              return record.id.toString() + 'table3';
            }}
            search={false}
            pagination={{
              pageSize: pagesize3,
              total: total3,
              pageSizeOptions: [10, 20, 50, 100],
              showQuickJumper: true,
              showSizeChanger: true,
            }}
            onSubmit={() => {
              setLoading3(true);
              getRemoteGenedrug({
                pageSize: pagesize3,
                pageIndex: 1,
                gene: keywords.gene,
                sort_field: undefined,
                sort_direction: undefined,
              }).then((res) => {
                setDrugs(res.data);
                setLoading3(false);
                setTotal3(res.meta.total);
              });
            }}
            onReset={() => {
              setLoading3(true);
              getRemoteGenedrug({
                pageSize: 10,
                pageIndex: 1,
                gene: undefined,
                sort_field: undefined,
                sort_direction: undefined,
              }).then((res) => {
                setDrugs(res.data);
                setLoading3(false);
                setTotal3(res.meta.total);
                setKeywords({});
              });
            }}
            onChange={(pagination, filters, sorter, extra) => {
              // console.log(pagination);
              // console.log(sorter);
              setPageindex3(pagination.current);
              setPagesize3(pagination.pageSize);
              setKeywords({ ...keywords, sort_field: sorter.field });
              setKeywords({ ...keywords, sort_direction: sorter.order });
              setLoading3(true);
              getRemoteGenedrug({
                pageSize: pagination.pageSize,
                pageIndex: pagination.current,
                gene: keywords.gene,
                sort_field: sorter.field,
                sort_direction: sorter.order,
              }).then((res) => {
                setDrugs(res.data);
                setLoading3(false);
                setTotal3(res.meta.total);
              });
            }}
          />
        </Col>
      </Row>
    </div>
  );
}
