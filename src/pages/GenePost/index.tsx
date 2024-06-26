import React, { useEffect, useState } from "react";
import styles from './index.less';
import { getRemoteGeneeqtl, getRemoteGeneeqtlLike } from "@/pages/GenePost/service";
import { Breadcrumb, Col, Divider, Row, Select, Space, Table } from "antd";
import {
  AnalysisIcon,DetailIcon
} from "../../components/Icons/index";
import { URL_PREFIX ,uniqueArray} from '@/common/constants';
import { ProTable } from "@ant-design/pro-table";
import { Parser } from 'json2csv';
export default function Page(props: any) {
  const [name, setName] = useState(undefined);
  useEffect(() => {
    console.log(props.match.params.name);
    setName(props.match.params.name);
  }, [props]);

  const [genecura, setGenecura] = useState(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState(0);
  const [pagesize, setPagesize] = useState(10);
  const [pageindex, setPageindex] = useState(1);

  interface SearchKeywords {
    gene: string | undefined;
    sort_field: string | undefined;
    sort_direction: string | undefined;
  };
  const [keywords, setKeywords] = useState<SearchKeywords>({});
  useEffect(()=>{
    if(name){
      if (name == "all"){
        setName(undefined);
        getRemoteGeneeqtl({
          pageSize: pagesize,
          pageIndex: pageindex,
          gene: undefined,
          sort_field: undefined,
          sort_direction: undefined
        }).then((res) => {
          setLoading(false);
          setGenecura(res.data);
          setTotal(res.meta.total);
        });
      }else {
        getRemoteGeneeqtlLike({
          pageSize: pagesize,
          pageIndex: pageindex,
          gene: name,
          sort_field: undefined,
          sort_direction: undefined
        }).then((res) => {
          setLoading(false);
          setGenecura(res.data);
          setTotal(res.meta.total);
        });
      }
    }

  },[name]);

  const [genelist, setGenelist] = useState([]);

  const [selectitems, setSelectitems] = useState([]);
  const [selectitemsrowkey, setSelectitemsrowkey] = useState([]);

  const columns =[
    Table.SELECTION_COLUMN,
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Evidence</strong>,
      key: 'evidence',
      dataIndex: 'evidence',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Gene</strong>,
      key: 'gene',
      dataIndex: 'gene',
      ellipsis: true,
      width: 150,
      search: true,
      sorter:true,
      renderFormItem: () => {
        const options = genelist.map((item) => (
          <Select.Option key={item} value={item} type={item}>
            {item}
          </Select.Option>
        ));
        return (
          <Select
            key={'geneSelect'}
            showSearch={true}
            placeholder={'input and select a gene'}
            filterOption={false}
            onFocus={async () => {
              const remoteKeywords = await getRemoteGeneeqtl({
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
              const remoteKeywords = await getRemoteGeneeqtlLike({
                pageSize: 100,
                pageIndex: 1,
                gene:value,
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
          <a href={"https://www.ncbi.nlm.nih.gov/gene/?term=" + record.gene} target={'_blank'}>
            <Space style={{ fontWeight: 'bold' }}>
              {record.gene}
            </Space>
          </a>
          </span>
        )
      }
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>pph3</strong>,
      key: 'pph3',
      dataIndex: 'pph3',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>pph4</strong>,
      key: 'pph4',
      dataIndex: 'pph4',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>p</strong>,
      key: 'p',
      dataIndex: 'p',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>FDR</strong>,
      key: 'fdr',
      dataIndex: 'fdr',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Cell Type</strong>,
      key: 'celltype',
      dataIndex: 'celltype',
      ellipsis: true,
      search: false,
      sorter:true,
      width: 200,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Trait</strong>,
      key: 'trait',
      dataIndex: 'trait',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Ancestry</strong>,
      key: 'pop',
      dataIndex: 'pop',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Year</strong>,
      key: 'year',
      dataIndex: 'year',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>PMID</strong>,
      key: 'pmid',
      dataIndex: 'pmid',
      ellipsis: true,
      search: false,
      sorter:true,
      render: (text: string, record) => (
        <span>
          <a
            className={styles.link}
            href={'https://pubmed.ncbi.nlm.nih.gov/' + record.pmid}
            target={'_blank'}
          >
            <Space>
              {record.pmid}
            </Space>
          </a>
        </span>
      ),
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
                <strong style={{ fontFamily: 'sans-serif' }}>
                  CMap Signatures
                </strong>
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
            dataSource={genecura}
            loading={loading}
            scroll={{ x: 1200 }}
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
              getRemoteGeneeqtl({
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
            onReset={()=>{
              setLoading(true);
              getRemoteGeneeqtl({
                pageSize: 10,
                pageIndex: 1,
                gene:undefined,
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
                getRemoteGeneeqtl({
                  pageSize: pagination.pageSize,
                  pageIndex: pagination.current,
                  gene:  keywords.gene,
                  sort_field: sorter.field,
                  sort_direction: sorter.order,
                }).then((res) => {
                  setGenecura(res.data);
                  setLoading(false);
                  setTotal(res.meta.total);
                });

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
                        'gene',
                        'celltype',
                        'species',
                        'trait',
                        'pmid',
                        'year',
                      ];
                      const json2csvParser = new Parser({ fields });
                      const csv = json2csvParser.parse(selectitems);
                      element.setAttribute(
                        'href',
                        'data:text/csv;charset=utf-8,' +
                        encodeURIComponent(csv),
                      );
                      element.setAttribute(
                        'download',
                        'Gene_curation.csv',
                      );
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
