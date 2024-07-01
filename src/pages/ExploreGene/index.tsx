import React, { useEffect, useState } from 'react';
import styles from './index.less';
import {
  getRemoteGenecrispr,
  getRemoteGenecura,
  getRemoteGenecuraLike,
  getRemoteGenedrug,
  getRemoteGeneRNAseq,
  getRemoteGeneDEG,
} from '@/pages/ExploreGene/service';
import {
  Breadcrumb,
  Col,
  Divider,
  Image,
  Row,
  Select,
  Space,
  Table, Tabs,
  Typography
} from "antd";
import { AnalysisIcon, DetailIcon } from '../../components/Icons/index';
import { URL_PREFIX, uniqueArray ,IMG_PREFIX} from '@/common/constants';
import { ProTable } from '@ant-design/pro-table';
import { Parser } from 'json2csv';
import { getRemoteCoexpression } from "@/pages/Toolkit/service";
const { Title, Paragraph, Text, Link } = Typography;

export default function Page(props: any) {
  const [name, setName] = useState(undefined);
  useEffect(() => {
    console.log(props.match.params.name);
    setName(props.match.params.name);
  }, [props]);

  const [genecura, setGenecura] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState(0);
  const [pagesize, setPagesize] = useState(10);
  const [pageindex, setPageindex] = useState(1);

  const [gene2, setGene2] = useState([]);
  const [loading2, setLoading2] = useState<boolean>(true);
  const [total2, setTotal2] = useState(0);
  const [pagesize2, setPagesize2] = useState(10);
  const [pageindex2, setPageindex2] = useState(1);

  const [gene3, setGene3] = useState([]);
  const [loading3, setLoading3] = useState<boolean>(true);
  const [total3, setTotal3] = useState(0);
  const [pagesize3, setPagesize3] = useState(10);
  const [pageindex3, setPageindex3] = useState(1);

  const [gene4, setGene4] = useState([]);
  const [loading4, setLoading4] = useState<boolean>(true);
  const [total4, setTotal4] = useState(0);
  const [pagesize4, setPagesize4] = useState(10);
  const [pageindex4, setPageindex4] = useState(1);

  const [gene5, setGene5] = useState([]);
  const [loading5, setLoading5] = useState<boolean>(true);
  const [total5, setTotal5] = useState(0);
  const [pagesize5, setPagesize5] = useState(10);
  const [pageindex5, setPageindex5] = useState(1);

  interface SearchKeywords {
    gene: string | undefined;
    sort_field: string | undefined;
    sort_direction: string | undefined;
  }
  const [keywords, setKeywords] = useState<SearchKeywords>({});
  useEffect(() => {
    if (name) {
      if (name == 'all') {
        setName(undefined);
        getRemoteGenecura({
          pageSize: pagesize,
          pageIndex: pageindex,
          gene: undefined,
          sort_field: undefined,
          sort_direction: undefined,
        }).then((res) => {
          setLoading(false);
          setGenecura(res.data);
          setTotal(res.meta.total);
        });
      } else {
        getRemoteGenecuraLike({
          pageSize: pagesize,
          pageIndex: pageindex,
          gene: name,
          sort_field: undefined,
          sort_direction: undefined,
        }).then((res) => {
          setLoading(false);
          setGenecura(res.data);
          setTotal(res.meta.total);
        });
      }
    }
  }, [name]);
  useEffect(() => {
    if (name) {
      if (name == 'all') {
        setName(undefined);
        getRemoteGenecrispr({
          pageSize: pagesize2,
          pageIndex: pageindex2,
          gene: undefined,
          sort_field: undefined,
          sort_direction: undefined,
        }).then((res) => {
          setLoading2(false);
          setGene2(res.data);
          setTotal2(res.meta.total);
        });
      } else {
        getRemoteGenecrispr({
          pageSize: pagesize2,
          pageIndex: pageindex2,
          gene: name,
          sort_field: undefined,
          sort_direction: undefined,
        }).then((res) => {
          setLoading2(false);
          setGene2(res.data);
          setTotal2(res.meta.total);
        });
      }
    }
  }, [name]);
  useEffect(() => {
    if (name) {
      if (name == 'all') {
        setName(undefined);
        getRemoteGenedrug({
          pageSize: pagesize3,
          pageIndex: pageindex3,
          gene: undefined,
          sort_field: undefined,
          sort_direction: undefined,
        }).then((res) => {
          setLoading3(false);
          setGene3(res.data);
          setTotal3(res.meta.total);
        });
      } else {
        getRemoteGenedrug({
          pageSize: pagesize3,
          pageIndex: pageindex3,
          gene: name,
          sort_field: undefined,
          sort_direction: undefined,
        }).then((res) => {
          setLoading3(false);
          setGene3(res.data);
          setTotal3(res.meta.total);
        });
      }
    }
  }, [name]);
  useEffect(() => {
    if (name) {
      if (name == 'all') {
        setName(undefined);
        getRemoteGeneRNAseq({
          pageSize: pagesize4,
          pageIndex: pageindex4,
          gene: undefined,
          sort_field: undefined,
          sort_direction: undefined,
        }).then((res) => {
          setLoading4(false);
          setGene4(res.data);
          setTotal4(res.meta.total);
        });
      } else {
        getRemoteGeneRNAseq({
          pageSize: pagesize4,
          pageIndex: pageindex4,
          gene: name,
          sort_field: undefined,
          sort_direction: undefined,
        }).then((res) => {
          setLoading4(false);
          setGene4(res.data);
          setTotal4(res.meta.total);
        });
      }
    }
  }, [name]);
  useEffect(() => {
    if (name) {
      if (name == 'all') {
        setName(undefined);
        getRemoteGeneDEG({
          pageSize: pagesize5,
          pageIndex: pageindex5,
          gene: undefined,
          sort_field: undefined,
          sort_direction: undefined,
        }).then((res) => {
          setLoading5(false);
          setGene5(res.data);
          setTotal5(res.meta.total);
        });
      } else {
        getRemoteGeneDEG({
          pageSize: pagesize5,
          pageIndex: pageindex5,
          gene: name,
          sort_field: undefined,
          sort_direction: undefined,
        }).then((res) => {
          setLoading5(false);
          setGene5(res.data);
          setTotal5(res.meta.total);
        });
      }
    }
  }, [name]);

  const [genelist, setGenelist] = useState([]);
  const [selectitems, setSelectitems] = useState([]);
  const [selectitemsrowkey, setSelectitemsrowkey] = useState([]);

  const [selectitems2, setSelectitems2] = useState([]);
  const [selectitemsrowkey2, setSelectitemsrowkey2] = useState([]);
  const [selectitems3, setSelectitems3] = useState([]);
  const [selectitemsrowkey3, setSelectitemsrowkey3] = useState([]);

  const columns = [
    Table.SELECTION_COLUMN,
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
            key={'cmapnameSelect'}
            showSearch={true}
            placeholder={'input and select a gene'}
            filterOption={false}
            onFocus={async () => {
              const remoteKeywords = await getRemoteGenecura({
                pageSize: 100,
                pageIndex: 1,
                gene: undefined,
                sort_field: undefined,
                sort_direction: undefined,
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
              const remoteKeywords = await getRemoteGenecuraLike({
                pageSize: 100,
                pageIndex: 1,
                gene: value,
                sort_field: undefined,
                sort_direction: undefined,
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
      render: (text: string, record: any) => {
        return (
          <span>
            <a
              href={'https://www.ncbi.nlm.nih.gov/gene/?term=' + record.gene}
              target={'_blank'}
            >
              <Space style={{ fontWeight: 'bold' }}>{record.gene}</Space>
            </a>
          </span>
        );
      },
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Cell Type</strong>,
      key: 'celltype',
      dataIndex: 'celltype',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Species</strong>,
      key: 'species',
      dataIndex: 'species',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Trait</strong>,
      key: 'trait',
      dataIndex: 'trait',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>PMID</strong>,
      key: 'pmid',
      dataIndex: 'pmid',
      ellipsis: true,
      search: false,
      sorter: true,
      render: (text: string, record) => (
        <span>
          <a
            className={styles.link}
            href={'https://pubmed.ncbi.nlm.nih.gov/' + record.pmid}
            target={'_blank'}
          >
            <Space>{record.pmid}</Space>
          </a>
        </span>
      ),
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Year</strong>,
      key: 'year',
      dataIndex: 'year',
      ellipsis: true,
      search: false,
      sorter: true,
    },
  ];
  const columns2 = [
    Table.SELECTION_COLUMN,
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>technology</strong>,
      key: 'technology',
      dataIndex: 'technology',
      ellipsis: true,
      width: 150,
      search: true,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>grna</strong>,
      key: 'grna',
      dataIndex: 'grna',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>gene</strong>,
      key: 'gene',
      dataIndex: 'gene',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>chr</strong>,
      key: 'chr',
      dataIndex: 'chr',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>start</strong>,
      key: 'start',
      dataIndex: 'start',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>end</strong>,
      key: 'end',
      dataIndex: 'end',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>diff</strong>,
      key: 'diff',
      dataIndex: 'diff',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>log2fc</strong>,
      key: 'log2fc',
      dataIndex: 'log2fc',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>p</strong>,
      key: 'p',
      dataIndex: 'p',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>fdr</strong>,
      key: 'fdr',
      dataIndex: 'fdr',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>celltype</strong>,
      key: 'celltype',
      dataIndex: 'celltype',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>PMID</strong>,
      key: 'pmid',
      dataIndex: 'pmid',
      ellipsis: true,
      search: false,
      sorter: true,
      render: (text: string, record) => (
        <span>
          <a
            className={styles.link}
            href={'https://pubmed.ncbi.nlm.nih.gov/' + record.pmid}
            target={'_blank'}
          >
            <Space>{record.pmid}</Space>
          </a>
        </span>
      ),
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Year</strong>,
      key: 'year',
      dataIndex: 'year',
      ellipsis: true,
      search: false,
      sorter: true,
    },
  ];
  const columns3 = [
    Table.SELECTION_COLUMN,
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
  const columns4 = [
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
      title: <strong style={{ fontFamily: 'sans-serif' }}>LogFC</strong>,
      key: 'log2fc',
      dataIndex: 'log2fc',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>p</strong>,
      key: 'p',
      dataIndex: 'p',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>FDR</strong>,
      key: 'fdr',
      dataIndex: 'fdr',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Cell Type</strong>,
      key: 'celltype',
      dataIndex: 'celltype',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Tissue</strong>,
      key: 'tissue',
      dataIndex: 'tissue',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Study</strong>,
      key: 'study',
      dataIndex: 'study',
      ellipsis: true,
      search: false,
      sorter: true,
    },
  ];
  const columns5 = [
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
      title: <strong style={{ fontFamily: 'sans-serif' }}>LogFC</strong>,
      key: 'logfc',
      dataIndex: 'logfc',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>p</strong>,
      key: 'p',
      dataIndex: 'p',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Adjust-p</strong>,
      key: 'padj',
      dataIndex: 'padj',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Cell Type</strong>,
      key: 'celltype',
      dataIndex: 'celltype',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Study</strong>,
      key: 'study',
      dataIndex: 'study',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Brain Region</strong>,
      key: 'brain_region',
      dataIndex: 'brain_region',
      ellipsis: true,
      search: false,
      sorter: true,
    },
  ];

  const [userinputcelltype, setUserinputcelltype] = useState(undefined);
  const [celltypelist, setCelltypelist] = useState([]);
  const celltypeoptions = celltypelist.map((item: string) => (
    <Select.Option key={item} value={item} type={item}>
      {item}
    </Select.Option>
  ));
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
                <strong style={{ fontFamily: 'sans-serif' }}>Gene</strong>
              </a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Divider />
      <Row style={{display: gene4.length>0 ? 'flex' : 'none' }}>
        <Col md={4}>
          <Title level={2}>RNA-seq</Title>
        </Col>
      </Row>
      <Row justify={'center'} style={{display: gene4.length>0 ? 'flex' : 'none' }}>
        <Col md={24}>
          <ProTable
            columns={columns4}
            bordered={true}
            options={false}
            dataSource={gene4}
            loading={loading4}
            scroll={{ x: 1200 }}
            rowKey={(record: any) => {
              return record.id.toString() + 'table4';
            }}
            search={false}
            pagination={{
              pageSize: pagesize4,
              total: total4,
              pageSizeOptions: [10, 20, 50, 100],
              showQuickJumper: true,
              showSizeChanger: true,
            }}
            onChange={(pagination, filters, sorter, extra) => {
              // console.log(pagination);
              // console.log(sorter);
              setPageindex4(pagination.current);
              setPagesize4(pagination.pageSize);
              setKeywords({ ...keywords, sort_field: sorter.field });
              setKeywords({ ...keywords, sort_direction: sorter.order });
              setLoading4(true);
              getRemoteGeneRNAseq({
                pageSize: pagination.pageSize,
                pageIndex: pagination.current,
                gene: keywords.gene,
                sort_field: sorter.field,
                sort_direction: sorter.order,
              }).then((res) => {
                setGene4(res.data);
                setLoading4(false);
                setTotal4(res.meta.total);
              });
            }}
          />
        </Col>
      </Row>
      <Divider />
      <Row style={{display: gene2.length>0 ? 'flex' : 'none' }}>
        <Col md={4}>
          <Title level={2}>CRISPR</Title>
        </Col>
      </Row>
      <Row justify={'center'} style={{display: gene2.length>0 ? 'flex' : 'none' }}>
        <Col md={24}>
          <ProTable
            columns={columns2}
            bordered={true}
            options={false}
            dataSource={gene2}
            loading={loading2}
            scroll={{ x: 1200 }}
            rowKey={(record: any) => {
              return record.id.toString() + 'table2';
            }}
            search={false}
            pagination={{
              pageSize: pagesize2,
              total: total2,
              pageSizeOptions: [10, 20, 50, 100],
              showQuickJumper: true,
              showSizeChanger: true,
            }}
            onSubmit={() => {
              setLoading2(true);
              getRemoteGenecrispr({
                pageSize: pagesize2,
                pageIndex: 1,
                gene: keywords.gene,
                sort_field: undefined,
                sort_direction: undefined,
              }).then((res) => {
                setGene2(res.data);
                setLoading2(false);
                setTotal2(res.meta.total);
              });
            }}
            onReset={() => {
              setLoading2(true);
              getRemoteGenecrispr({
                pageSize: 10,
                pageIndex: 1,
                gene: undefined,
                sort_field: undefined,
                sort_direction: undefined,
              }).then((res) => {
                setGene2(res.data);
                setLoading2(false);
                setTotal2(res.meta.total);
                setKeywords({});
              });
            }}
            onChange={(pagination, filters, sorter, extra) => {
              // console.log(pagination);
              // console.log(sorter);
              setPageindex2(pagination.current);
              setPagesize2(pagination.pageSize);
              setKeywords({ ...keywords, sort_field: sorter.field });
              setKeywords({ ...keywords, sort_direction: sorter.order });
              setLoading2(true);
              getRemoteGenecrispr({
                pageSize: pagination.pageSize,
                pageIndex: pagination.current,
                gene: keywords.gene,
                sort_field: sorter.field,
                sort_direction: sorter.order,
              }).then((res) => {
                setGene2(res.data);
                setLoading2(false);
                setTotal2(res.meta.total);
              });
            }}
          />
        </Col>
      </Row>
      <Divider />
      <Row style={{display: genecura.length>0 ? 'flex' : 'none' }}>
        <Col md={4}>
          <Title level={2}>Curation</Title>
        </Col>
      </Row>
      <Row justify={'center'} style={{display: genecura.length>0 ? 'flex' : 'none' }}>
        <Col md={24}>
          <ProTable
            columns={columns}
            bordered={true}
            options={false}
            dataSource={genecura}
            loading={loading}
            scroll={{ x: 1200 }}
            rowKey={(record: any) => {
              return record.id.toString() + 'table';
            }}
            search={false}
            pagination={{
              pageSize: pagesize,
              total: total,
              pageSizeOptions: [10, 20, 50, 100],
              showQuickJumper: true,
              showSizeChanger: true,
            }}
            onSubmit={() => {
              setLoading(true);
              getRemoteGenecura({
                pageSize: pagesize,
                pageIndex: 1,
                gene: keywords.gene,
                sort_field: undefined,
                sort_direction: undefined,
              }).then((res) => {
                setGenecura(res.data);
                setLoading(false);
                setTotal(res.meta.total);
              });
            }}
            onReset={() => {
              setLoading(true);
              getRemoteGenecura({
                pageSize: 10,
                pageIndex: 1,
                gene: undefined,
                sort_field: undefined,
                sort_direction: undefined,
              }).then((res) => {
                setGenecura(res.data);
                setLoading(false);
                setTotal(res.meta.total);
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
              getRemoteGenecura({
                pageSize: pagination.pageSize,
                pageIndex: pagination.current,
                gene: keywords.gene,
                sort_field: sorter.field,
                sort_direction: sorter.order,
              }).then((res) => {
                setGenecura(res.data);
                setLoading(false);
                setTotal(res.meta.total);
              });
            }}
          />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Title level={2}>Function</Title>
      </Row>
      <Row>
        <Tabs
          defaultActiveKey="fetal_forebrain"
          onChange={onChange}
          items={[
            {
              label: `Fetal Forebrain`,
              key: 'fetal_forebrain',
              children:
                <Row justify={'center'}>
                  <Col md={2}>
                    <Title level={3}>Expression:</Title>
                  </Col>
                  <Col md={11}>
                    <Image width={'90%'} preview={false} src={IMG_PREFIX + 'gene_function/' + key +'/draw_graph_fa_celltypes.png' } />
                  </Col>
                  <Col md={11}>
                    <Image width={'90%'}  preview={false} src={IMG_PREFIX + 'gene_function/' + key +'/draw_graph_fa_'+ name +'.png' } />
                  </Col>
                  <Col md={2}>
                    <Title level={3}>Trajectory:</Title>
                  </Col>
                  <Col md={11}>
                    <Image width={'90%'}  preview={false} src={IMG_PREFIX + 'gene_function/' + key +'/paga_celltypes.png' } />
                  </Col>
                  <Col md={11}>
                    <Image width={'90%'}  preview={false} src={IMG_PREFIX + 'gene_function/' + key +'/paga_' + name +'.png' } />
                  </Col>
                </Row>,
            },
            {
              label: `Cerebellum`,
              key: 'cerebellum',
              children:
                <Row justify={'center'}>
                  <Col md={2}>
                    <Title level={3}>Expression:</Title>
                  </Col>
                    <Col md={11}>
                      <Image width={'90%'} preview={false} src={IMG_PREFIX + 'gene_function/' + key +'/draw_graph_fa_celltypes.png' } />
                    </Col>
                    <Col md={11}>
                      <Image width={'90%'}  preview={false} src={IMG_PREFIX + 'gene_function/' + key +'/draw_graph_fa_'+ name +'.png' } />
                    </Col>
                  <Col md={2}>
                    <Title level={3}>Trajectory:</Title>
                  </Col>
                  <Col md={11}>
                    <Image width={'90%'}  preview={false} src={IMG_PREFIX + 'gene_function/' + key +'/paga_celltypes.png' } />
                  </Col>
                  <Col md={11}>
                    <Image width={'90%'}  preview={false} src={IMG_PREFIX + 'gene_function/' + key +'/paga_' + name +'.png' } />
                  </Col>
                </Row>,
            },
            {
              label: `Ganglionic Eminences and Cortex`,
              key: 'ganglionic_eminences_and_cortex',
              children:
                <Row justify={'center'}>
                  <Col md={2}>
                    <Title level={3}>Expression:</Title>
                  </Col>
                  <Col md={11}>
                    <Image width={'90%'} preview={false} src={IMG_PREFIX + 'gene_function/' + key +'/draw_graph_fa_celltypes.png' } />
                  </Col>
                  <Col md={11}>
                    <Image width={'90%'}  preview={false} src={IMG_PREFIX + 'gene_function/' + key +'/draw_graph_fa_'+ name +'.png' } />
                  </Col>
                  <Col md={2}>
                    <Title level={3}>Trajectory:</Title>
                  </Col>
                  <Col md={11}>
                    <Image width={'90%'}  preview={false} src={IMG_PREFIX + 'gene_function/' + key +'/paga_celltypes.png' } />
                  </Col>
                  <Col md={11}>
                    <Image width={'90%'}  preview={false} src={IMG_PREFIX + 'gene_function/' + key +'/paga_' + name +'.png' } />
                  </Col>
                </Row>,
            },
            {
              label: `Hippocampal-Entorhinal System`,
              key: 'hippocampal-entorhinal_system',
              children:
                <Row justify={'center'}>
                  <Col md={2}>
                    <Title level={3}>Expression:</Title>
                  </Col>
                  <Col md={11}>
                    <Image width={'90%'} preview={false} src={IMG_PREFIX + 'gene_function/' + key +'/draw_graph_fa_celltypes.png' } />
                  </Col>
                  <Col md={11}>
                    <Image width={'90%'}  preview={false} src={IMG_PREFIX + 'gene_function/' + key +'/draw_graph_fa_'+ name +'.png' } />
                  </Col>
                  <Col md={2}>
                    <Title level={3}>Trajectory:</Title>
                  </Col>
                  <Col md={11}>
                    <Image width={'90%'}  preview={false} src={IMG_PREFIX + 'gene_function/' + key +'/paga_celltypes.png' } />
                  </Col>
                  <Col md={11}>
                    <Image width={'90%'}  preview={false} src={IMG_PREFIX + 'gene_function/' + key +'/paga_' + name +'.png' } />
                  </Col>
                </Row>,
            },
            {
              label: `Hippocampus`,
              key: 'hippocampus',
              children:
                <Row justify={'center'}>
                  <Col md={2}>
                    <Title level={3}>Expression:</Title>
                  </Col>
                  <Col md={11}>
                    <Image width={'90%'} preview={false} src={IMG_PREFIX + 'gene_function/' + key +'/draw_graph_fa_celltypes.png' } />
                  </Col>
                  <Col md={11}>
                    <Image width={'90%'}  preview={false} src={IMG_PREFIX + 'gene_function/' + key +'/draw_graph_fa_'+ name +'.png' } />
                  </Col>
                  <Col md={2}>
                    <Title level={3}>Trajectory:</Title>
                  </Col>
                  <Col md={11}>
                    <Image width={'90%'}  preview={false} src={IMG_PREFIX + 'gene_function/' + key +'/paga_celltypes.png' } />
                  </Col>
                  <Col md={11}>
                    <Image width={'90%'}  preview={false} src={IMG_PREFIX + 'gene_function/' + key +'/paga_' + name +'.png' } />
                  </Col>
                </Row>,
            },
            {
              label: `Neocortex`,
              key: 'neocortex',
              children:
                <Row justify={'center'}>
                  <Col md={2}>
                    <Title level={3}>Expression:</Title>
                  </Col>
                  <Col md={11}>
                    <Image width={'90%'} preview={false} src={IMG_PREFIX + 'gene_function/' + key +'/draw_graph_fa_celltypes.png' } />
                  </Col>
                  <Col md={11}>
                    <Image width={'90%'}  preview={false} src={IMG_PREFIX + 'gene_function/' + key +'/draw_graph_fa_'+ name +'.png' } />
                  </Col>
                  <Col md={2}>
                    <Title level={3}>Trajectory:</Title>
                  </Col>
                  <Col md={11}>
                    <Image width={'90%'}  preview={false} src={IMG_PREFIX + 'gene_function/' + key +'/paga_celltypes.png' } />
                  </Col>
                  <Col md={11}>
                    <Image width={'90%'}  preview={false} src={IMG_PREFIX + 'gene_function/' + key +'/paga_' + name +'.png' } />
                  </Col>
                </Row>,
            },
            {
              label: `Prefrontal Cortex in Schizophrenia Subjects`,
              key: 'prefrontal_cortex_in_schizophrenia_subjects',
              children:
                <Row justify={'center'}>
                  <Col md={2}>
                    <Title level={3}>Expression:</Title>
                  </Col>
                  <Col md={11}>
                    <Image width={'90%'} preview={false} src={IMG_PREFIX + 'gene_function/' + key +'/draw_graph_fa_celltypes.png' } />
                  </Col>
                  <Col md={11}>
                    <Image width={'90%'}  preview={false} src={IMG_PREFIX + 'gene_function/' + key +'/draw_graph_fa_'+ name +'.png' } />
                  </Col>
                  <Col md={2}>
                    <Title level={3}>Trajectory:</Title>
                  </Col>
                  <Col md={11}>
                    <Image width={'90%'}  preview={false} src={IMG_PREFIX + 'gene_function/' + key +'/paga_celltypes.png' } />
                  </Col>
                  <Col md={11}>
                    <Image width={'90%'}  preview={false} src={IMG_PREFIX + 'gene_function/' + key +'/paga_' + name +'.png' } />
                  </Col>
                </Row>,
            },
          ]}
        />
      </Row>
      <Divider/>
      <Row style={{display: gene5.length>0 ? 'flex' : 'none' }}>
        <Col md={4}>
          <Title level={2}>DEG</Title>
        </Col>
      </Row>
      <Row style={{display: gene5.length>0 ? 'flex' : 'none' }}>
        <Col md={24}>
          <ProTable
            columns={columns5}
            bordered={true}
            options={false}
            dataSource={gene5}
            loading={loading5}
            scroll={{ x: 1800 }}
            rowKey={(record: any) => {
              return record.id.toString() + 'table5';
            }}
            search={false}
            pagination={{
              pageSize: pagesize5,
              total: total5,
              pageSizeOptions: [10, 20, 50, 100],
              showQuickJumper: true,
              showSizeChanger: true,
            }}
            onSubmit={() => {
              setLoading3(true);
              getRemoteGeneDEG({
                pageSize: pagesize3,
                pageIndex: 1,
                gene: keywords.gene,
                sort_field: undefined,
                sort_direction: undefined,
              }).then((res) => {
                setGene5(res.data);
                setLoading5(false);
                setTotal5(res.meta.total);
              });
            }}
            onReset={() => {
              setLoading5(true);
              getRemoteGeneDEG({
                pageSize: 10,
                pageIndex: 1,
                gene: undefined,
                sort_field: undefined,
                sort_direction: undefined,
              }).then((res) => {
                setGene5(res.data);
                setLoading5(false);
                setTotal5(res.meta.total);
                setKeywords({});
              });
            }}
            onChange={(pagination, filters, sorter, extra) => {
              // console.log(pagination);
              // console.log(sorter);
              setPageindex5(pagination.current);
              setPagesize5(pagination.pageSize);
              setKeywords({ ...keywords, sort_field: sorter.field });
              setKeywords({ ...keywords, sort_direction: sorter.order });
              setLoading3(true);
              getRemoteGeneDEG({
                pageSize: pagination.pageSize,
                pageIndex: pagination.current,
                gene: keywords.gene,
                sort_field: sorter.field,
                sort_direction: sorter.order,
              }).then((res) => {
                setGene5(res.data);
                setLoading5(false);
                setTotal5(res.meta.total);
              });
            }}
          />
        </Col>
      </Row>
      <Divider/>
      <Row style={{display: gene3.length>0 ? 'flex' : 'none' }}>
        <Col md={4}>
          <Title level={2}>Drug</Title>
        </Col>
      </Row>
      <Row justify={'center'} style={{display: gene3.length>0 ? 'flex' : 'none' }}>
        <Col md={24}>
          <ProTable
            columns={columns3}
            bordered={true}
            options={false}
            dataSource={gene3}
            loading={loading3}
            scroll={{ x: 2800 }}
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
                setGene3(res.data);
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
                setGene3(res.data);
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
                setGene3(res.data);
                setLoading3(false);
                setTotal3(res.meta.total);
              });
            }}
            // rowSelection={{
            //   fixed: true,
            //   onSelect: (record, selected, selectedRows, nativeEvent) => {
            //     if (selected) {
            //       let a = Array.from(
            //         new Set(selectitems3.concat(selectedRows)),
            //       );
            //       let b = a.filter((res) => res != undefined);
            //       setSelectitems3(b);
            //       let c = b.map((value) => value.id + 'table3');
            //       setSelectitemsrowkey3(c);
            //     } else {
            //       let b = selectitems3.filter((x) => x.id != record.id);
            //       setSelectitems3(b);
            //       let c = b.map((value) => value.id + 'table3');
            //       setSelectitemsrowkey3(c);
            //     }
            //   },
            //   onSelectAll: (selected, selectedRows, changeRows) => {
            //     if (selected) {
            //       let a = uniqueArray(selectitems3.concat(changeRows), 'id');
            //       let b = a.filter((res) => res != undefined);
            //       setSelectitems3(b);
            //       let c = b.map((value) => value.id + 'table3');
            //       setSelectitemsrowkey3(c);
            //     } else {
            //       let a = new Set();
            //       changeRows.forEach((value) => {
            //         a.add(value.id);
            //       });
            //       let b = selectitems3.filter((x) => !a.has(x.id));
            //       setSelectitems3(b);
            //       let c = b.map((value) => value.id + 'table3');
            //       setSelectitemsrowkey3(c);
            //     }
            //   },
            //   selectedRowKeys: selectitemsrowkey3,
            // }}
            // tableAlertRender={({
            //   selectedRowKeys,
            //   selectedRows,
            //   onCleanSelected,
            // }) => {
            //   const onCancelselected = () => {
            //     setSelectitems3([]);
            //     setSelectitemsrowkey3([]);
            //   };
            //   return (
            //     <Space size={24}>
            //       <span>
            //         {selectitems3.length} items selected
            //         <span onClick={onCancelselected}>
            //           <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
            //             Clear selected
            //           </a>
            //         </span>
            //       </span>
            //     </Space>
            //   );
            // }}
            // tableAlertOptionRender={({
            //   selectedRowKeys,
            //   selectedRows,
            //   onCleanSelected,
            // }) => {
            //   return (
            //     <Space size={20}>
            //       <a
            //         onClick={() => {
            //           let element = document.createElement('a');
            //           const fields = [
            //             'gene',
            //             'celltype',
            //             'species',
            //             'trait',
            //             'pmid',
            //             'year',
            //           ];
            //           const json2csvParser = new Parser({ fields });
            //           const csv = json2csvParser.parse(selectitems3);
            //           element.setAttribute(
            //             'href',
            //             'data:text/csv;charset=utf-8,' +
            //               encodeURIComponent(csv),
            //           );
            //           element.setAttribute('download', 'Gene.csv');
            //           element.style.display = 'none';
            //           document.body.appendChild(element);
            //           element.click();
            //           document.body.removeChild(element);
            //           onCleanSelected;
            //         }}
            //       >
            //         Download
            //       </a>
            //     </Space>
            //   );
            // }}
          />
        </Col>
      </Row>
    </div>
  );
}
