package com.nftcar.alyra.repository;

import com.nftcar.alyra.domain.FeePool;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the FeePool entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FeePoolRepository extends JpaRepository<FeePool, Long> {}
