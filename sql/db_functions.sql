-- /sql/db_functions.sql
-- This file contains the necessary SQL functions for the admin dashboard.
-- Please apply this file to your Supabase database.

-- Function to get sales by month
CREATE OR REPLACE FUNCTION get_sales_by_month(start_date DATE, end_date DATE)
RETURNS TABLE(month TEXT, total_sales NUMERIC) AS $$
BEGIN
    RETURN QUERY
    SELECT
        to_char(date_trunc('month', commandes.date_creation), 'YYYY-MM') AS month,
        SUM(commandes.montant_total) AS total_sales
    FROM commandes
    WHERE commandes.statut_paiement IN ('PAYE_EN_LIGNE', 'PAYE_PRESENTIEL')
      AND commandes.date_creation >= start_date
      AND commandes.date_creation <= end_date
    GROUP BY date_trunc('month', commandes.date_creation)
    ORDER BY date_trunc('month', commandes.date_creation);
END;
$$ LANGUAGE plpgsql;

-- Function to get payment method distribution
CREATE OR REPLACE FUNCTION get_payment_method_distribution(start_date DATE, end_date DATE)
RETURNS TABLE(methode_paiement TEXT, count BIGINT) AS $$
BEGIN
    RETURN QUERY
    SELECT
        commandes.methode_paiement,
        COUNT(*) AS count
    FROM commandes
    WHERE commandes.date_creation >= start_date
      AND commandes.date_creation <= end_date
    GROUP BY commandes.methode_paiement;
END;
$$ LANGUAGE plpgsql;

-- Function to get order status distribution
CREATE OR REPLACE FUNCTION get_order_status_distribution(start_date DATE, end_date DATE)
RETURNS TABLE(statut_paiement TEXT, count BIGINT) AS $$
BEGIN
    RETURN QUERY
    SELECT
        commandes.statut_paiement,
        COUNT(*) AS count
    FROM commandes
    WHERE commandes.date_creation >= start_date
      AND commandes.date_creation <= end_date
    GROUP BY commandes.statut_paiement;
END;
$$ LANGUAGE plpgsql;
