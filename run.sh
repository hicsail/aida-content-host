usage() {
    echo "Usage: $0 [OPTION]"
    echo "Build and run docker container based on the selected option."
    echo
    echo "Options:"
    echo "  -h, --help              Display this help message"
    echo "  -d, --database          Run MongoDB service only"
    echo "  -f, --frontend          Run digital repository service only"
    echo "  -v, --visualization     Run visualization service only"
    echo "  -a, --all               Run all services"
    exit 1
}

if [ $# -eq 0 ]; then
    usage
fi

case "$1" in
    -h|--help)
        usage
        ;;
    -d|--database)
        echo "Starting database service..."
        docker compose -f docker-compose-local.yml up -d --build mongodb
        ;;
    -f|--frontend)
        echo "Starting digital repository service..."
        docker compose -f docker-compose-local.yml up -d --build frontend backend backend-digital-repo mongodb
        ;;
    -v|--visualization)
        echo "Starting visualization service..."
        docker compose -f docker-compose-local.yml up -d --build visualization
        ;;
    -a|--all)
        echo "Starting all services..."
        docker compose -f docker-compose-local.yml up -d --build
        ;;
    *)
        echo "Invalid option: $1"
        usage
        ;;
esac