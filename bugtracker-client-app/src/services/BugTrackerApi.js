import axios from 'axios'

const apiUrl = "https://localhost:5001/api/ticket/";

export function getAllTickets() {
    return axios.get(apiUrl).then(function (response) {
        return response.data;
    }
    )
};

export function getTicketById(id) {
    return axios.get(apiUrl + id).then(function (response) {
        return response.data;
    })
};

export function deleteTicket(id) {
    return axios.delete(apiUrl + id);
};

export function createTicket(ticketBody) {
    axios.post(apiUrl, ticketBody)
};

export function updateTicket(updateBody) {
    axios.put(apiUrl + updateBody.id, updateBody)
}



