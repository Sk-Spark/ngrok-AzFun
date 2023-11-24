import axios from 'axios';

export async function makeNgrokApiRequest() {
    const url = 'https://api.ngrok.com/tunnels';
    const token = '2FqoVlEun1pbSPKJ8DRji74M3qk_4s89tG15nPYWf93S8WuRH';
    try {
        const response = await axios.get(url, {
            // add your ngrok auth token to the request header
            headers: {
                Authorization: `Bearer ${token}`,
                "Ngrok-Version": "2"
            },
        });
        // Handle the response data here
        console.log(response.data);
        return response.data;
    } catch (error) {
        // Handle any errors that occur during the request
        console.error(error);
    }
}
