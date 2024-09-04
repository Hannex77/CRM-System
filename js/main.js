var customers = JSON.parse(localStorage.getItem('customers')) || [];
var orders = JSON.parse(localStorage.getItem('orders')) || {};
var selectedCustomerId = null;

const currentPage = window.location.pathname.split("/").pop();

function findHighestId(data) {
    return data.reduce((max, obj) => {
        return parseInt(obj.id) > parseInt(max.id) ? obj : max;
    }, data[0]);
}