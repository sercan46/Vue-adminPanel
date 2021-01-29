const PieChartVue=(chartName,animation,titleText,titleColor,yValue,dataPoint)=>{
    var chart = new CanvasJS.Chart(chartName, {
        animationEnabled: animation,
        title: {
          text: titleText,
          fontColor: titleColor,
        },
        data: [
          {
            type: "pie",
            startAngle: 240,
            yValueFormatString: yValue,
            indexLabel: "{label} {y}",
            dataPoints: dataPoint,
          },
        ],
      });
      chart.render();
}
export default PieChartVue