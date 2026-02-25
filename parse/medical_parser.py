import re


# Common medical tests (extend later)
TESTS = {
    "hemoglobin": "Hemoglobin",
    "hb": "Hemoglobin",
    "glucose": "Blood Glucose",
    "sugar": "Blood Glucose",
    "cholesterol": "Cholesterol"
}


def parse_report(text: str):
    """
    Extract and deduplicate medical values
    """

    results = {}
    lines = text.split("\n")

    for line in lines:

        line_clean = line.strip().lower()

        for key, test_name in TESTS.items():

            if key in line_clean:

                data = _extract_numbers(line_clean)

                if not data:
                    continue

                # Use test name as key (dedup)
                if test_name not in results:
                    results[test_name] = {
                        "test": test_name,
                        "value": data.get("value"),
                        "unit": data.get("unit"),
                        "low": data.get("low"),
                        "high": data.get("high"),
                        "status": _get_status(data)
                    }

                else:
                    # If duplicate found, keep better value
                    existing = results[test_name]

                    if data.get("value"):
                        existing["value"] = data.get("value")
                        existing["status"] = _get_status(data)

    return list(results.values())


def _extract_numbers(line: str):

    # Match: 9.2 g/dL
    value_match = re.search(r"(\d+\.?\d*)\s*(mg/dl|g/dl|mmol/l)?", line)

    # Match: 13.5 - 17.5
    range_match = re.search(
        r"(\d+\.?\d*)\s*[-–]\s*(\d+\.?\d*)",
        line
    )

    if not value_match:
        return None

    value = float(value_match.group(1))
    unit = value_match.group(2)

    low = None
    high = None

    if range_match:
        low = float(range_match.group(1))
        high = float(range_match.group(2))

    return {
        "value": value,
        "unit": unit,
        "low": low,
        "high": high
    }


def _get_status(data):

    value = data.get("value")
    low = data.get("low")
    high = data.get("high")

    if low and value < low:
        return "low"

    if high and value > high:
        return "high"

    return "normal"