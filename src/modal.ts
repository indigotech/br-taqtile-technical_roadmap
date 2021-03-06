import * as d3 from 'd3';

const duration = 750;

export class Modal {
  constructor() {}

  appendModalFlag(node) {
    const flagEnter = node
    .enter()
    .filter(function(d) {
      return (
        Array.isArray(d.data.additionalInfo) && d.data.additionalInfo.length
      );
    })
    .append('g')
    .attr('class', 'flag')
    .attr('type', 'button')
    .attr('data-toggle', 'modal')
    .attr('data-target', '#node-modal')
    .style('opacity', 1e-6)
    .attr('transform', function(d) {
      return 'translate(' + (+d.y + +d.width - 15) + ',' + (+d.x - 35) + ')';
    })
    .on('click', this.updateModalContent);

    flagEnter
      .append('use')
      .attr('xlink:href', '#quote');
  }

  updateFlag(svg, nodes, i){
    const flagUpdate = svg.selectAll('g.flag').data(nodes, function(d) {
      return d.id || (d.id = ++i);
    });

    flagUpdate
      .transition()
      .duration(duration)
      .style('opacity', 1)
      .attr('transform', function(d) {
        return 'translate(' + (+d.y + +d.width - 15) + ',' + (+d.x - 35) + ')';
      })

    flagUpdate
      .exit()
      .transition()
      .duration(duration)
      .style('opacity', 1e-6)
      .remove();
  }

  private updateModalContent(d) {
    let modalHeader = d3.select('#node-modal-label');
    modalHeader.html(d.data.name + ' References');
    let modalBody = d3.select('.modal-body');
    modalBody.selectAll('.list-group').remove();
    let listGroup = modalBody.append('div').attr('class', 'list-group list-group-flush');
    d.data.additionalInfo.forEach(text => {
      listGroup
        .append('a')
        .attr('class', 'list-group-item list-group-item-action text-truncate')
        .attr('target', '__blank')
        .attr('href', text)
        .style('background-color', '#343a40')
        .style('border-color', 'white')
        .style('color', 'white')
        .html(text)
        .append('br');
    });
  }
}
