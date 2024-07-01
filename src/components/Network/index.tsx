import React, { useEffect, useState } from 'react';
import styles from './index.less';
import request from 'umi-request';
import HighchartsReact from 'highcharts-react-official';
import Highcharts, { addEvent } from 'highcharts';
import HighchartNetworkgraph from 'highcharts/modules/networkgraph';
HighchartNetworkgraph(Highcharts);

export default function Page(props: any) {
  const [state, setState] = useState({
    chartOptions: {
      chart: {
        type: 'networkgraph',
        style: {
          fontFamily: 'Arial',
          fontSize: '20px',
          fontWeight: 'bold',
        },
      },
      credits: {
        enabled: false,
      },
      title: {
        text: 'Co-expression Network',
      },
      plotOptions: {
        networkgraph: {
          keys: ['from', 'to'],
          layoutAlgorithm: {
            enableSimulation: true,
          },
        },
      },
      series: [
        {
          dataLabels: {
            enabled: true,
            format: '{point.name}',
          },
          allowPointSelect: true,
        },
      ],
    },
  });

  useEffect(() => {
    // console.log(typeof Highcharts.seriesType('networkgraph'))
    // Highcharts.addEvent(
    //   // Highcharts.seriesType('networkgraph'),
    //   Highcharts.Series,
    //   'afterSetOptions',
    //   ()=>{console.log('addEvent')},
    // );
    const series = [
      {
        dataLabels: {
          enabled: true,
        },
        allowPointSelect: true,
        data: props.network.data,
        nodes: props.network.nodes,
      },
    ];
    // console.log(props.network);
    //TODO://修改高度,加图例
    setState({
      chartOptions: {
        series: series,
        chart: { height: 600,
          width: (window.innerWidth/3)*2, },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          // x: -150,
          // y: 100,
          floating: true,
          backgroundColor: '#FFFFFF',
          labelFormat: '<span> (click to hide or show)</span>',
        },
      },
    });
    // }
  }, [props]);

  return (
    // <div style={{ height: '400px' }}>
    <div>
      <HighchartsReact highcharts={Highcharts} options={state.chartOptions} />
    </div>
  );
}
