<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Trader88 | Data Operasional</title>
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
    <h2 style="text-align:center; margin-bottom:20px;">TRADER 88 | Data Operasional</h2>

    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Tanggal</th>
                <th>Alat</th>
                <th>Jam Operasional</th>
                <th>Retase</th>
                <th>Solar</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($operasional as $item)
                <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>{{ $item->tanggal }}</td>
                    <td>{{ $item->alat->alat }}</td>
                    <td>{{ $item->jam_operasional }}</td>
                    <td>{{ $item->retase }}</td>
                    <td>{{ $item->solar }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
