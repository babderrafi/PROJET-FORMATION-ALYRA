package com.nftcar.alyra.service.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.nftcar.alyra.domain.Distribution} entity.
 */
public class DistributionDTO implements Serializable {

    private Long id;

    @NotNull
    private BigDecimal amountUsdc;

    @NotNull
    private String status;

    private RevenueDTO revenue;

    private PartDTO part;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getAmountUsdc() {
        return amountUsdc;
    }

    public void setAmountUsdc(BigDecimal amountUsdc) {
        this.amountUsdc = amountUsdc;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public RevenueDTO getRevenue() {
        return revenue;
    }

    public void setRevenue(RevenueDTO revenue) {
        this.revenue = revenue;
    }

    public PartDTO getPart() {
        return part;
    }

    public void setPart(PartDTO part) {
        this.part = part;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DistributionDTO)) {
            return false;
        }

        DistributionDTO distributionDTO = (DistributionDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, distributionDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DistributionDTO{" +
            "id=" + getId() +
            ", amountUsdc=" + getAmountUsdc() +
            ", status='" + getStatus() + "'" +
            ", revenue=" + getRevenue() +
            ", part=" + getPart() +
            "}";
    }
}
