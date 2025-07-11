<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Trader88 | Data Pengajuan</title>
    <style>
        body {
            font-family: sans-serif;
            font-size: 12px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th,
        td {
            border: 1px solid #333;
            padding: 6px;
            text-align: left;
        }

        th {
            background-color: #fb923c;
        }
    </style>
</head>

<body>
    <h2 style="text-align:center; margin-bottom:20px;">TRADER 88 | Data Pengajuan</h2>

    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Tanggal</th>
                <th>Pembeli</th>
                <th>Lokasi Muat</th>
                <th>Lokasi Tujuan</th>
                <th>Pembayaran</th>
                <th>Kapal</th>
                <th>Kuantitas</th>
                <th>Kadar Nikel</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($pengajuan as $item)
                <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>{{ $item->tanggal }}</td>
                    <td>{{ $item->pembeli }}</td>
                    <td>{{ $item->lokasi_muat ? $item->lokasi_muat : '' }}</td>
                    <td>{{ $item->lokasi_tujuan ? $item->lokasi_tujuan : '' }}</td>
                    <td>{{ $item->pembayaran ? $item->pembayaran : '' }}</td>
                    <td>{{ $item->kapal ? $item->kapal : '' }}</td>
                    <td>{{ $item->kuantitas ? $item->kuantitas : '' }}</td>
                    <td>{{ $item->kadar_nikel ? $item->kadar_nikel : '' }}</td>
                    <td>{{ $item->status === 'dimuat' ? 'Dimuat' : 'Belum Dimuat' }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
