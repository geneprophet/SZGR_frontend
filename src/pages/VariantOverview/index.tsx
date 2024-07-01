import React, { useEffect, useState } from 'react';
import styles from './index.less';
import {
  getRemoteVariant,
  getRemoteVariantLike,
  getRemoteVariantlocus,
} from '@/pages/VariantOverview/service';
import { ApartmentOutlined, SearchOutlined } from '@ant-design/icons';
import { Parser } from 'json2csv';
// @ts-ignore
import { URL_PREFIX, uniqueArray } from '@/common/constants';
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
import { ProColumns, ProTable } from '@ant-design/pro-table';
import { AnalysisIcon } from '../../components/Icons/index';
import { pop } from 'echarts/types/src/component/dataZoom/history';
export default function Page(props: any) {
  const [name, setName] = useState(undefined);
  const [variants, setVariants] = useState(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState(0);
  const [pagesize, setPagesize] = useState(10);
  const [pageindex, setPageindex] = useState(1);

  interface SearchKeywords {
    vid: string | undefined;
    vtype: string | undefined;
    pop: string | undefined;
    sort_field: string | undefined;
    sort_direction: string | undefined;
  }

  const [keywords, setKeywords] = useState<SearchKeywords>({});
  useEffect(() => {
    console.log(props.match.params.name);
    setName(props.match.params.name);
  }, [props]);

  useEffect(() => {
    if (name) {
      if (name == 'all') {
        setName(undefined);
        getRemoteVariant({
          pageSize: pagesize,
          pageIndex: pageindex,
          vid: undefined,
          vtype: undefined,
          pop: undefined,
          sort_field: undefined,
          sort_direction: undefined,
        }).then((res) => {
          setLoading(false);
          setVariants(res.data);
          setTotal(res.meta.total);
        });
      } else if (name.startsWith('rs')) {
        getRemoteVariantLike({
          pageSize: pagesize,
          pageIndex: pageindex,
          vid: name,
          vtype: undefined,
          pop: undefined,
          sort_field: undefined,
          sort_direction: undefined,
        }).then((res) => {
          // console.log(res.data);
          setLoading(false);
          setVariants(res.data);
          setTotal(res.meta.total);
        });
      } else if (name == 'CV') {
        getRemoteVariantLike({
          pageSize: pagesize,
          pageIndex: pageindex,
          vid: undefined,
          vtype: 'CV',
          pop: undefined,
          sort_field: undefined,
          sort_direction: undefined,
        }).then((res) => {
          // console.log(res.data);
          setLoading(false);
          setVariants(res.data);
          setTotal(res.meta.total);
        });
      } else if (name == 'RV') {
        getRemoteVariantLike({
          pageSize: pagesize,
          pageIndex: pageindex,
          vid: undefined,
          vtype: 'RV',
          pop: undefined,
          sort_field: undefined,
          sort_direction: undefined,
        }).then((res) => {
          // console.log(res.data);
          setLoading(false);
          setVariants(res.data);
          setTotal(res.meta.total);
        });
      } else if (name == 'DNM') {
        getRemoteVariantLike({
          pageSize: pagesize,
          pageIndex: pageindex,
          vid: undefined,
          vtype: 'DNM',
          pop: undefined,
          sort_field: undefined,
          sort_direction: undefined,
        }).then((res) => {
          // console.log(res.data);
          setLoading(false);
          setVariants(res.data);
          setTotal(res.meta.total);
        });
      } else if (name == 'CNV') {
        getRemoteVariantLike({
          pageSize: pagesize,
          pageIndex: pageindex,
          vid: undefined,
          vtype: 'CNV',
          pop: undefined,
          sort_field: undefined,
          sort_direction: undefined,
        }).then((res) => {
          // console.log(res.data);
          setLoading(false);
          setVariants(res.data);
          setTotal(res.meta.total);
        });
      } else if (name == 'SV') {
        getRemoteVariantLike({
          pageSize: pagesize,
          pageIndex: pageindex,
          vid: undefined,
          vtype: 'SV',
          pop: undefined,
          sort_field: undefined,
          sort_direction: undefined,
        }).then((res) => {
          // console.log(res.data);
          setLoading(false);
          setVariants(res.data);
          setTotal(res.meta.total);
        });
      } else {
        let regex = /chr(\d+):([\d]+)-([\d]+)/;
        let match = name.match(regex);
        if (match) {
          let chromosome = match[1];
          let start = match[2];
          let end = match[3];
          getRemoteVariantlocus({
            pageSize: pagesize,
            pageIndex: pageindex,
            vchr: chromosome,
            vs: start,
            ve: end,
            sort_field: undefined,
            sort_direction: undefined,
          }).then((res) => {
            // console.log(res.data);
            setLoading(false);
            setVariants(res.data);
            setTotal(res.meta.total);
          });
        }
      }
    }
  }, [name]);

  const [vtypelist, setVtypelist] = useState([]);
  const [vidlist, setVidlist] = useState([]);
  const [genelist, setGenelist] = useState([]);
  const [poplist, setPoplist] = useState([]);

  const [selectitems, setSelectitems] = useState([]);
  const [selectitemsrowkey, setSelectitemsrowkey] = useState([]);
  const columns = [
    Table.SELECTION_COLUMN,
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Variant Type</strong>,
      key: 'vtype',
      dataIndex: 'vtype',
      ellipsis: true,
      width: 120,
      sorter: true,
      renderFormItem: () => {
        const options = vtypelist.map((item) => (
          <Select.Option key={item} value={item} type={item}>
            {item}
          </Select.Option>
        ));
        return (
          <Select
            key={'vtypeSelect'}
            showSearch={true}
            placeholder={'input and select a type'}
            filterOption={false}
            onFocus={async () => {
              const remoteKeywords = await getRemoteVariant({
                pageSize: 1000,
                pageIndex: 1,
                vid: keywords.vid,
                vtype: undefined,
                pop: keywords.pop,
                sort_field: undefined,
                sort_direction: undefined,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.vtype);
                  }
                });
                setVtypelist(nameList);
              }
            }}
            onSearch={async (value: string) => {
              const remoteKeywords = await getRemoteVariantLike({
                pageSize: 100,
                pageIndex: 1,
                vid: keywords.vid,
                vtype: value,
                pop: keywords.pop,
                sort_field: undefined,
                sort_direction: undefined,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.vtype);
                  }
                });
                setVtypelist(nameList);
              }
            }}
            onChange={(value) => {
              setKeywords({ ...keywords, vtype: value });
              // console.log(value)
            }}
          >
            {options}
          </Select>
        );
      },
      // render: (text: string, record: any) => (
      //   <span>
      //     <a href={URL_PREFIX + '/variant/' + record.vtype}>
      //       <Space style={{ fontWeight: 'bold' }}>
      //         {record.vtype}
      //       </Space>
      //     </a>
      //   </span>
      // ),
    },
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
              const remoteKeywords = await getRemoteVariant({
                pageSize: 100,
                pageIndex: 1,
                vid: undefined,
                vtype: keywords.vtype,
                pop: keywords.pop,
                sort_field: undefined,
                sort_direction: undefined,
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
              const remoteKeywords = await getRemoteVariantLike({
                pageSize: 100,
                pageIndex: 1,
                vid: value,
                vtype: keywords.vtype,
                pop: keywords.pop,
                sort_field: undefined,
                sort_direction: undefined,
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
            <Space>{record.vid}</Space>
          </a>
        </span>
      ),
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Location</strong>,
      key: 'loc',
      dataIndex: 'loc',
      ellipsis: true,
      search: false,
      sorter: true,
      width: 150,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Chromosome</strong>,
      key: 'vchr',
      dataIndex: 'vchr',
      ellipsis: true,
      sorter: true,
      search: false,
      width: 100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Start</strong>,
      key: 'vs',
      dataIndex: 'vs',
      ellipsis: true,
      search: false,
      sorter: true,
      width: 100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>End</strong>,
      key: 've',
      dataIndex: 've',
      ellipsis: true,
      search: false,
      sorter: true,
      width: 100,
    },
    {
      title: (
        <strong style={{ fontFamily: 'sans-serif' }}>Effect Allele</strong>
      ),
      key: 'ea',
      dataIndex: 'ea',
      ellipsis: true,
      search: false,
      sorter: true,
      width: 150,
    },
    {
      title: (
        <strong style={{ fontFamily: 'sans-serif' }}>Reference Allele</strong>
      ),
      key: 'noa',
      dataIndex: 'noa',
      ellipsis: true,
      search: false,
      sorter: true,
      width: 150,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Beta</strong>,
      key: 'beta',
      dataIndex: 'beta',
      ellipsis: true,
      search: false,
      sorter: true,
      width: 100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>p</strong>,
      key: 'p',
      dataIndex: 'p',
      ellipsis: true,
      search: false,
      sorter: true,
      width: 100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Ancestry</strong>,
      key: 'pop',
      dataIndex: 'pop',
      ellipsis: true,
      search: true,
      sorter: true,
      width: 100,
      renderFormItem: () => {
        const options = poplist.map((item) => (
          <Select.Option key={item} value={item} type={item}>
            {item}
          </Select.Option>
        ));
        return (
          <Select
            key={'popSelect'}
            showSearch={true}
            placeholder={'input and select a ancestry'}
            filterOption={false}
            onFocus={async () => {
              const remoteKeywords = await getRemoteVariant({
                pageSize: 100,
                pageIndex: 1,
                vid: keywords.vid,
                vtype: keywords.vtype,
                pop: undefined,
                sort_field: undefined,
                sort_direction: undefined,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.pop);
                  }
                });
                setPoplist(nameList);
              }
            }}
            onSearch={async (value: string) => {
              const remoteKeywords = await getRemoteVariantLike({
                pageSize: 100,
                pageIndex: 1,
                vid: keywords.vid,
                vtype: keywords.vtype,
                pop: value,
                sort_field: undefined,
                sort_direction: undefined,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.pop);
                  }
                });
                setPoplist(nameList);
              }
            }}
            onChange={(value) => {
              setKeywords({ ...keywords, pop: value });
              // console.log(value)
            }}
          >
            {options}
          </Select>
        );
      },
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Gene</strong>,
      key: 'gene',
      dataIndex: 'gene',
      ellipsis: true,
      search: false,
      sorter: true,
      width: 100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Trait</strong>,
      key: 'trait',
      dataIndex: 'trait',
      ellipsis: true,
      search: false,
      sorter: true,
      width: 150,
    },

    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>#Case</strong>,
      key: 'ncase',
      dataIndex: 'ncase',
      ellipsis: true,
      search: false,
      sorter: true,
      width: 100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>#Control</strong>,
      key: 'ncontrol',
      dataIndex: 'ncontrol',
      ellipsis: true,
      search: false,
      sorter: true,
      width: 100,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>PMID</strong>,
      key: 'pmid',
      dataIndex: 'pmid',
      ellipsis: true,
      search: false,
      sorter: true,
      width: 100,
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
      key: 'nyear',
      dataIndex: 'nyear',
      ellipsis: true,
      search: false,
      sorter: true,
      width: 100,
    },
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
                <strong style={{ fontFamily: 'sans-serif' }}>Variants</strong>
              </a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Divider />
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
              getRemoteVariant({
                pageSize: pagesize,
                pageIndex: 1,
                vid: keywords.vid,
                vtype: keywords.vtype,
                pop: keywords.pop,
                sort_field: undefined,
                sort_direction: undefined,
              }).then((res) => {
                setVariants(res.data);
                setLoading(false);
                setTotal(res.meta.total);
              });
            }}
            onReset={() => {
              setLoading(true);
              getRemoteVariant({
                pageSize: 10,
                pageIndex: 1,
                vid: undefined,
                vtype: undefined,
                pop: undefined,
                sort_field: undefined,
                sort_direction: undefined,
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
              if (name) {
                getRemoteVariantLike({
                  pageSize: pagination.pageSize,
                  pageIndex: pagination.current,
                  vid: keywords.vid,
                  vtype: keywords.vtype,
                  pop: keywords.pop,
                  sort_field: sorter.field,
                  sort_direction: sorter.order,
                }).then((res) => {
                  setVariants(res.data);
                  setLoading(false);
                  setTotal(res.meta.total);
                });
              } else {
                getRemoteVariant({
                  pageSize: pagination.pageSize,
                  pageIndex: pagination.current,
                  vid: keywords.vid,
                  vtype: keywords.vtype,
                  pop: keywords.pop,
                  sort_field: sorter.field,
                  sort_direction: sorter.order,
                }).then((res) => {
                  setVariants(res.data);
                  setLoading(false);
                  setTotal(res.meta.total);
                });
              }
            }}
            rowSelection={{
              fixed: true,
              onSelect: (record, selected, selectedRows, nativeEvent) => {
                if (selected) {
                  let a = Array.from(new Set(selectitems.concat(selectedRows)));
                  let b = a.filter((res) => res != undefined);
                  setSelectitems(b);
                  let c = b.map((value) => value.id + 'table');
                  setSelectitemsrowkey(c);
                } else {
                  let b = selectitems.filter((x) => x.id != record.id);
                  setSelectitems(b);
                  let c = b.map((value) => value.id + 'table');
                  setSelectitemsrowkey(c);
                }
              },
              onSelectAll: (selected, selectedRows, changeRows) => {
                if (selected) {
                  let a = uniqueArray(selectitems.concat(changeRows), 'id');
                  let b = a.filter((res) => res != undefined);
                  setSelectitems(b);
                  let c = b.map((value) => value.id + 'table');
                  setSelectitemsrowkey(c);
                } else {
                  let a = new Set();
                  changeRows.forEach((value) => {
                    a.add(value.id);
                  });
                  let b = selectitems.filter((x) => !a.has(x.id));
                  setSelectitems(b);
                  let c = b.map((value) => value.id + 'table');
                  setSelectitemsrowkey(c);
                }
              },
              selectedRowKeys: selectitemsrowkey,
            }}
            tableAlertRender={({
              selectedRowKeys,
              selectedRows,
              onCleanSelected,
            }) => {
              const onCancelselected = () => {
                setSelectitems([]);
                setSelectitemsrowkey([]);
              };
              return (
                <Space size={24}>
                  <span>
                    {selectitems.length} items selected
                    <span onClick={onCancelselected}>
                      <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                        Clear selected
                      </a>
                    </span>
                  </span>
                </Space>
              );
            }}
            tableAlertOptionRender={({
              selectedRowKeys,
              selectedRows,
              onCleanSelected,
            }) => {
              return (
                <Space size={20}>
                  <a
                    onClick={() => {
                      let element = document.createElement('a');
                      const fields = [
                        'vid',
                        'vtype',
                        'loc',
                        'vchr',
                        'vs',
                        've',
                        'ea',
                        'noa',
                        'nor',
                        'beta',
                        'p',
                        'gene',
                        'pop',
                        'trait',
                        'ncase',
                        'ncontrol',
                        'nyear',
                        'pmid',
                      ];
                      const json2csvParser = new Parser({ fields });
                      const csv = json2csvParser.parse(selectitems);
                      element.setAttribute(
                        'href',
                        'data:text/csv;charset=utf-8,' +
                          encodeURIComponent(csv),
                      );
                      element.setAttribute('download', 'SZGR_variants.csv');
                      element.style.display = 'none';
                      document.body.appendChild(element);
                      element.click();
                      document.body.removeChild(element);
                      onCleanSelected;
                    }}
                  >
                    Download
                  </a>
                </Space>
              );
            }}
          />
        </Col>
      </Row>
    </div>
  );
}
