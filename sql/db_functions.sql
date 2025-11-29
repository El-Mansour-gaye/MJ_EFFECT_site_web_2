-- /sql/db_functions.sql
-- This file contains the necessary SQL functions for the admin dashboard.
-- Please apply this file to your Supabase database.

-- Function to get sales by month
CREATE OR REPLACE FUNCTION get_sales_by_month()
RETURNS TABLE(month TEXT, total_sales NUMERIC) AS $$
BEGIN
    RETURN QUERY
    SELECT
        to_char(date_trunc('month', date_creation), 'YYYY-MM') AS month,
        SUM(montant_total) AS total_sales
    FROM commandes
    WHERE statut_paiement IN ('PAYE_EN_LIGNE', 'PAYE_PRESENTIEL')
    GROUP BY date_trunc('month', date_creation)
    ORDER BY date_trunc('month', date_creation);
END;
$$ LANGUAGE plpgsql;

-- Function to get payment method distribution
CREATE OR REPLACE FUNCTION get_payment_method_distribution()
RETURNS TABLE(methode_paiement TEXT, count BIGINT) AS $$
BEGIN
    RETURN QUERY
    SELECT
        methode_paiement,
        COUNT(*) AS count
    FROM commandes
    GROUP BY methode_paiement;
END;
$$ LANGUAGE plpgsql;

-- Function to get order status distribution
CREATE OR REPLACE FUNCTION get_order_status_distribution()
RETURNS TABLE(statut_paiement TEXT, count BIGINT) AS $$
BEGIN
    RETURN QUERY
    SELECT
        statut_paiement,
        COUNT(*) AS count
    FROM commandes
    GROUP BY statut_paiement;
END;
$$ LANGUAGE plpgsql;
