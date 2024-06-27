import React, { useEffect, useState } from "react";
import styles from './index.less';
import { getRemoteVariant, getRemoteVariantLike, getRemoteVariantlocus } from "@/pages/VariantOverview/service";
import { ApartmentOutlined, SearchOutlined } from '@ant-design/icons';
import { Parser } from 'json2csv';
// @ts-ignore
import { URL_PREFIX,uniqueArray } from '@/common/constants';
import {
  Breadcrumb,
  Col,
  Divider,
  Table,
  Row,
  Select,
  Space,
  Typography,
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
      pageSize: pagesize,
      pageIndex: pageindex,
      gene: undefined,
      sort_field:undefined,
      sort_direction:undefined
    }).then((res) => {
      setLoading2(false);
      setGenes(res.data);
      setTotal2(res.meta.total);
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
      title: <strong style={{ fontFamily: 'sans-serif' }}>twas</strong>,
      key: 'twas',
      dataIndex: 'twas',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>ewas</strong>,
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
      title: <strong style={{ fontFamily: 'sans-serif' }}>CRISPR T</strong>,
      key: 'crispr_t',
      dataIndex: 'crispr_t',
      ellipsis: true,
      search: false,
      sorter: true,
      width:100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Literature</strong>,
      key: 'literature',
      dataIndex: 'literature',
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
                  Variants
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
    </div>
  );
}
